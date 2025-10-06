import { supabase } from '../lib/supabase';

export const trackingService = {
  // Generate a unique short code
  generateShortCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  // Create or get existing tracking link for a campaign
  async getOrCreateTrackingLink(campaignId) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if tracking link already exists
      const { data: existingLink, error: fetchError } = await supabase
        .from('tracking_links')
        .select('*')
        .eq('campaign_id', campaignId)
        .eq('promoter_id', user.id)
        .single();

      if (existingLink && !fetchError) {
        return { data: existingLink, error: null };
      }

      // Create new tracking link
      let shortCode;
      let isUnique = false;
      let attempts = 0;

      while (!isUnique && attempts < 10) {
        shortCode = this.generateShortCode();
        const { data: existing } = await supabase
          .from('tracking_links')
          .select('id')
          .eq('short_code', shortCode)
          .single();

        if (!existing) {
          isUnique = true;
        }
        attempts++;
      }

      if (!isUnique) {
        throw new Error('Could not generate unique short code');
      }

      const { data, error } = await supabase
        .from('tracking_links')
        .insert([{
          campaign_id: campaignId,
          promoter_id: user.id,
          short_code: shortCode
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating tracking link:', error);
      return { data: null, error };
    }
  },

  // Get all tracking links for current promoter
  async getPromoterTrackingLinks() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('tracking_links')
        .select(`
          *,
          campaigns (
            id,
            title,
            payout_per_click,
            is_active,
            remaining_budget
          ),
          clicks (count)
        `)
        .eq('promoter_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching tracking links:', error);
      return { data: null, error };
    }
  },

  // Get tracking link by short code (public)
  async getTrackingLinkByCode(shortCode) {
    try {
      const { data, error } = await supabase
        .from('tracking_links')
        .select(`
          *,
          campaigns (
            destination_url,
            is_active,
            remaining_budget,
            payout_per_click
          )
        `)
        .eq('short_code', shortCode)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching tracking link:', error);
      return { data: null, error };
    }
  },

  // Record a click (public endpoint)
  async recordClick(trackingLinkId, campaignId, promoterId, ipAddress, userAgent) {
    try {
      const { data, error } = await supabase
        .from('clicks')
        .insert([{
          tracking_link_id: trackingLinkId,
          campaign_id: campaignId,
          promoter_id: promoterId,
          ip_address: ipAddress,
          user_agent: userAgent,
          is_valid: false, // Will be validated by trigger
          payout_amount: null
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error recording click:', error);
      return { data: null, error };
    }
  },

  // Get click statistics for promoter
  async getPromoterClickStats() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: clicks, error } = await supabase
        .from('clicks')
        .select(`
          *,
          campaigns (
            title,
            payout_per_click
          ),
          tracking_links (
            short_code
          )
        `)
        .eq('promoter_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Calculate statistics
      const totalClicks = clicks.length;
      const validClicks = clicks.filter(c => c.is_valid).length;
      const totalEarnings = clicks.filter(c => c.is_valid)
        .reduce((sum, c) => sum + parseFloat(c.payout_amount || 0), 0);

      // Group clicks by date
      const clicksByDate = {};
      clicks.forEach(click => {
        const date = new Date(click.created_at).toLocaleDateString();
        if (!clicksByDate[date]) {
          clicksByDate[date] = { total: 0, valid: 0, earnings: 0 };
        }
        clicksByDate[date].total++;
        if (click.is_valid) {
          clicksByDate[date].valid++;
          clicksByDate[date].earnings += parseFloat(click.payout_amount || 0);
        }
      });

      return {
        data: {
          clicks,
          stats: {
            totalClicks,
            validClicks,
            invalidClicks: totalClicks - validClicks,
            totalEarnings,
            conversionRate: totalClicks > 0 ? (validClicks / totalClicks) * 100 : 0,
            clicksByDate: Object.entries(clicksByDate).map(([date, data]) => ({
              date,
              ...data
            })).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 30)
          }
        },
        error: null
      };
    } catch (error) {
      console.error('Error fetching click stats:', error);
      return { data: null, error };
    }
  },

  // Build full tracking URL
  buildTrackingUrl(shortCode) {
    const baseUrl = window.location.origin;
    return `${baseUrl}/r/${shortCode}`;
  }
};