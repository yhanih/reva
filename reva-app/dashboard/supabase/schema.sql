-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text check (role in ('marketer', 'promoter')) default 'marketer',
  full_name text,
  avatar_url text,
  website text,
  balance decimal(12,2) default 0.00,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a table for campaigns (Marketers create these)
create table campaigns (
  id uuid default uuid_generate_v4() primary key,
  marketer_id uuid references profiles(id) not null,
  title text not null,
  description text,
  target_url text not null,
  image_url text,
  cpc decimal(10,2) not null, -- Cost Per Click
  budget decimal(12,2) not null,
  spent decimal(12,2) default 0.00,
  status text check (status in ('active', 'paused', 'completed')) default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table campaigns enable row level security;

create policy "Campaigns are viewable by everyone."
  on campaigns for select
  using ( true );

create policy "Marketers can insert their own campaigns."
  on campaigns for insert
  with check ( auth.uid() = marketer_id );

create policy "Marketers can update their own campaigns."
  on campaigns for update
  using ( auth.uid() = marketer_id );

-- Create a table for clicks (Tracking promoter performance)
create table clicks (
  id uuid default uuid_generate_v4() primary key,
  campaign_id uuid references campaigns(id) not null,
  promoter_id uuid references profiles(id), -- Can be null if organic/direct
  ip_address text,
  user_agent text,
  referer text,
  valid boolean default true,
  cost decimal(10,2) not null, -- Amount deducted from budget / credited to promoter
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table clicks enable row level security;

create policy "Marketers can view clicks for their campaigns."
  on clicks for select
  using ( exists ( select 1 from campaigns where id = clicks.campaign_id and marketer_id = auth.uid() ) );

create policy "Promoters can view their own clicks."
  on clicks for select
  using ( promoter_id = auth.uid() );

-- Create a table for transactions (Deposits, Payouts, Earnings)
create table transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  amount decimal(12,2) not null,
  type text check (type in ('deposit', 'payout', 'earning', 'spend')) not null,
  description text,
  status text check (status in ('pending', 'completed', 'failed')) default 'completed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table transactions enable row level security;

create policy "Users can view their own transactions."
  on transactions for select
  using ( auth.uid() = user_id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'role');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
