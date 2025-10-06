import { supabase } from '../lib/supabase';

export const campaignService = {
  // Create a new campaign (marketer only)
  async createCampaign(campaignData) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('campaigns')
        .insert([{
          marketer_id: user.id,
          title: campaignData.title,
          description: campaignData.description,
          destination_url: campaignData.destinationUrl,
          budget: campaignData.budget,
          payout_per_click: campaignData.payoutPerClick,
          remaining_budget: campaignData.budget,
          is_active: true
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating campaign:', error);
      return { data: null, error };
    }
  },

  // Get all campaigns for current marketer
  async getMarketerCampaigns() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          tracking_links (count),
          clicks (count)
        `)
        .eq('marketer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      return { data: null, error };
    }
  },

  // Get all active campaigns (for promoters)
  async getActiveCampaigns() {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('is_active', true)
        .gt('remaining_budget', 0)
        .order('payout_per_click', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching active campaigns:', error);
      return { data: null, error };
    }
  },

  // Get single campaign details
  async getCampaignById(campaignId) {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', campaignId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching campaign:', error);
      return { data: null, error };
    }
  },

  // Update campaign
  async updateCampaign(campaignId, updates) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('campaigns')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', campaignId)
        .eq('marketer_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating campaign:', error);
      return { data: null, error };
    }
  },

  // Toggle campaign active status
  async toggleCampaignStatus(campaignId) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // First get current status
      const { data: campaign, error: fetchError } = await supabase
        .from('campaigns')
        .select('is_active')
        .eq('id', campaignId)
        .eq('marketer_id', user.id)
        .single();

      if (fetchError) throw fetchError;

      // Toggle the status
      const { data, error } = await supabase
        .from('campaigns')
        .update({
          is_active: !campaign.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', campaignId)
        .eq('marketer_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error toggling campaign status:', error);
      return { data: null, error };
    }
  },

  // Get campaign analytics
  async getCampaignAnalytics(campaignId) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get campaign with click data
      const { data: campaign, error: campaignError } = await supabase
        .from('campaigns')
        .select(`
          *,
          clicks (
            id,
            is_valid,
            payout_amount,
            created_at,
            ip_address,
            promoter_id
          ),
          tracking_links (
            id,
            promoter_id,
            short_code
          )
        `)
        .eq('id', campaignId)
        .single();

      if (campaignError) throw campaignError;

      // Calculate analytics
      const totalClicks = campaign.clicks?.length || 0;
      const validClicks = campaign.clicks?.filter(c => c.is_valid).length || 0;
      const totalSpent = campaign.clicks?.filter(c => c.is_valid)
        .reduce((sum, c) => sum + parseFloat(c.payout_amount || 0), 0) || 0;
      const conversionRate = totalClicks > 0 ? (validClicks / totalClicks) * 100 : 0;
      const uniquePromoters = [...new Set(campaign.tracking_links?.map(t => t.promoter_id))].length;

      // Get clicks over time for chart
      const clicksByDay = {};
      campaign.clicks?.forEach(click => {
        const date = new Date(click.created_at).toLocaleDateString();
        if (!clicksByDay[date]) {
          clicksByDay[date] = { total: 0, valid: 0 };
        }
        clicksByDay[date].total++;
        if (click.is_valid) clicksByDay[date].valid++;
      });

      return {
        data: {
          campaign: {
            ...campaign,
            clicks: undefined,
            tracking_links: undefined
          },
          analytics: {
            totalClicks,
            validClicks,
            totalSpent,
            conversionRate,
            uniquePromoters,
            remainingBudget: campaign.remaining_budget,
            clicksByDay: Object.entries(clicksByDay).map(([date, data]) => ({
              date,
              ...data
            })).sort((a, b) => new Date(a.date) - new Date(b.date))
          }
        },
        error: null
      };
    } catch (error) {
      console.error('Error fetching campaign analytics:', error);
      return { data: null, error };
    }
  }
};