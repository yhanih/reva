-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('marketer', 'promoter')),
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  marketer_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  destination_url TEXT NOT NULL,
  budget DECIMAL(10, 2) NOT NULL,
  payout_per_click DECIMAL(10, 2) NOT NULL,
  remaining_budget DECIMAL(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tracking links table
CREATE TABLE IF NOT EXISTS tracking_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) NOT NULL,
  promoter_id UUID REFERENCES profiles(id) NOT NULL,
  short_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(campaign_id, promoter_id)
);

-- Clicks table
CREATE TABLE IF NOT EXISTS clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_link_id UUID REFERENCES tracking_links(id) NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) NOT NULL,
  promoter_id UUID REFERENCES profiles(id) NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  is_valid BOOLEAN DEFAULT false,
  payout_amount DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Earnings table
CREATE TABLE IF NOT EXISTS earnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  promoter_id UUID REFERENCES profiles(id) NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) NOT NULL,
  click_id UUID REFERENCES clicks(id) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'paid')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_campaigns_marketer ON campaigns(marketer_id);
CREATE INDEX IF NOT EXISTS idx_tracking_links_campaign ON tracking_links(campaign_id);
CREATE INDEX IF NOT EXISTS idx_tracking_links_promoter ON tracking_links(promoter_id);
CREATE INDEX IF NOT EXISTS idx_clicks_tracking_link ON clicks(tracking_link_id);
CREATE INDEX IF NOT EXISTS idx_clicks_promoter ON clicks(promoter_id);
CREATE INDEX IF NOT EXISTS idx_earnings_promoter ON earnings(promoter_id);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE earnings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Campaigns policies
CREATE POLICY "Marketers can create campaigns" ON campaigns
  FOR INSERT WITH CHECK (auth.uid() = marketer_id);

CREATE POLICY "Marketers can view own campaigns" ON campaigns
  FOR SELECT USING (auth.uid() = marketer_id);

CREATE POLICY "Promoters can view active campaigns" ON campaigns
  FOR SELECT USING (is_active = true);

CREATE POLICY "Marketers can update own campaigns" ON campaigns
  FOR UPDATE USING (auth.uid() = marketer_id);

-- Tracking links policies
CREATE POLICY "Promoters can create tracking links" ON tracking_links
  FOR INSERT WITH CHECK (auth.uid() = promoter_id);

CREATE POLICY "Users can view own tracking links" ON tracking_links
  FOR SELECT USING (auth.uid() = promoter_id);

CREATE POLICY "Marketers can view campaign tracking links" ON tracking_links
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = tracking_links.campaign_id 
      AND campaigns.marketer_id = auth.uid()
    )
  );

-- Clicks policies (public insert for tracking, but restricted reads)
CREATE POLICY "Anyone can insert clicks" ON clicks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Promoters can view own clicks" ON clicks
  FOR SELECT USING (auth.uid() = promoter_id);

CREATE POLICY "Marketers can view campaign clicks" ON clicks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = clicks.campaign_id 
      AND campaigns.marketer_id = auth.uid()
    )
  );

-- Earnings policies
CREATE POLICY "Promoters can view own earnings" ON earnings
  FOR SELECT USING (auth.uid() = promoter_id);

CREATE POLICY "System can insert earnings" ON earnings
  FOR INSERT WITH CHECK (true);

-- Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'role');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update remaining budget
CREATE OR REPLACE FUNCTION update_campaign_budget()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_valid = true THEN
    UPDATE campaigns
    SET remaining_budget = remaining_budget - NEW.payout_amount
    WHERE id = NEW.campaign_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update budget on valid click
DROP TRIGGER IF EXISTS on_valid_click ON clicks;
CREATE TRIGGER on_valid_click
  AFTER INSERT OR UPDATE ON clicks
  FOR EACH ROW
  WHEN (NEW.is_valid = true)
  EXECUTE FUNCTION update_campaign_budget();
