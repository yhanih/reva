import { supabase } from '../lib/supabase';

export const analyticsService = {
  // Get dashboard analytics for marketers
  async getMarketerDashboard() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get all campaigns with related data
      const { data: campaigns, error: campaignsError } = await supabase
        .from('campaigns')
        .select(`
          *,
          clicks (
            id,
            is_valid,
            payout_amount,
            created_at
          ),
          tracking_links (
            id,
            promoter_id
          )
        `)
        .eq('marketer_id', user.id);

      if (campaignsError) throw campaignsError;

      // Calculate overall metrics
      let totalSpent = 0;
      let totalClicks = 0;
      let validClicks = 0;
      let totalBudget = 0;
      let remainingBudget = 0;
      const uniquePromoters = new Set();

      campaigns.forEach(campaign => {
        totalBudget += parseFloat(campaign.budget || 0);
        remainingBudget += parseFloat(campaign.remaining_budget || 0);

        campaign.clicks?.forEach(click => {
          totalClicks++;
          if (click.is_valid) {
            validClicks++;
            totalSpent += parseFloat(click.payout_amount || 0);
          }
        });

        campaign.tracking_links?.forEach(link => {
          uniquePromoters.add(link.promoter_id);
        });
      });

      // Get clicks over time (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const clicksByDate = {};
      campaigns.forEach(campaign => {
        campaign.clicks?.forEach(click => {
          if (new Date(click.created_at) >= thirtyDaysAgo) {
            const date = new Date(click.created_at).toLocaleDateString();
            if (!clicksByDate[date]) {
              clicksByDate[date] = { total: 0, valid: 0, spent: 0 };
            }
            clicksByDate[date].total++;
            if (click.is_valid) {
              clicksByDate[date].valid++;
              clicksByDate[date].spent += parseFloat(click.payout_amount || 0);
            }
          }
        });
      });

      const chartData = Object.entries(clicksByDate)
        .map(([date, data]) => ({
          date,
          ...data
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      // Get top performing campaigns
      const topCampaigns = campaigns
        .map(campaign => ({
          id: campaign.id,
          title: campaign.title,
          clicks: campaign.clicks?.length || 0,
          validClicks: campaign.clicks?.filter(c => c.is_valid).length || 0,
          spent: campaign.clicks?.filter(c => c.is_valid)
            .reduce((sum, c) => sum + parseFloat(c.payout_amount || 0), 0) || 0,
          conversionRate: campaign.clicks?.length > 0
            ? ((campaign.clicks.filter(c => c.is_valid).length / campaign.clicks.length) * 100).toFixed(2)
            : 0
        }))
        .sort((a, b) => b.validClicks - a.validClicks)
        .slice(0, 5);

      return {
        data: {
          overview: {
            totalCampaigns: campaigns.length,
            activeCampaigns: campaigns.filter(c => c.is_active).length,
            totalBudget,
            totalSpent,
            remainingBudget,
            totalClicks,
            validClicks,
            conversionRate: totalClicks > 0 ? ((validClicks / totalClicks) * 100).toFixed(2) : 0,
            uniquePromoters: uniquePromoters.size,
            avgCostPerClick: validClicks > 0 ? (totalSpent / validClicks).toFixed(2) : 0
          },
          chartData,
          topCampaigns,
          recentCampaigns: campaigns
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5)
            .map(c => ({
              id: c.id,
              title: c.title,
              budget: c.budget,
              remaining_budget: c.remaining_budget,
              is_active: c.is_active,
              created_at: c.created_at
            }))
        },
        error: null
      };
    } catch (error) {
      console.error('Error fetching marketer dashboard:', error);
      return { data: null, error };
    }
  },

  // Get dashboard analytics for promoters
  async getPromoterDashboard() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get all clicks and earnings
      const [clicksResult, earningsResult, linksResult] = await Promise.all([
        supabase
          .from('clicks')
          .select(`
            *,
            campaigns (
              title,
              payout_per_click
            )
          `)
          .eq('promoter_id', user.id),
        supabase
          .from('earnings')
          .select(`
            *,
            campaigns (title)
          `)
          .eq('promoter_id', user.id),
        supabase
          .from('tracking_links')
          .select(`
            *,
            campaigns (
              title,
              payout_per_click,
              is_active
            )
          `)
          .eq('promoter_id', user.id)
      ]);

      if (clicksResult.error) throw clicksResult.error;
      if (earningsResult.error) throw earningsResult.error;
      if (linksResult.error) throw linksResult.error;

      const clicks = clicksResult.data;
      const earnings = earningsResult.data;
      const links = linksResult.data;

      // Calculate metrics
      const totalClicks = clicks.length;
      const validClicks = clicks.filter(c => c.is_valid).length;
      const totalEarnings = earnings.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
      const pendingEarnings = earnings.filter(e => e.status === 'pending')
        .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
      const paidEarnings = earnings.filter(e => e.status === 'paid')
        .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

      // Get performance over time (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const performanceByDate = {};
      clicks.forEach(click => {
        if (new Date(click.created_at) >= thirtyDaysAgo) {
          const date = new Date(click.created_at).toLocaleDateString();
          if (!performanceByDate[date]) {
            performanceByDate[date] = { clicks: 0, validClicks: 0, earnings: 0 };
          }
          performanceByDate[date].clicks++;
          if (click.is_valid) {
            performanceByDate[date].validClicks++;
            performanceByDate[date].earnings += parseFloat(click.payout_amount || 0);
          }
        }
      });

      const chartData = Object.entries(performanceByDate)
        .map(([date, data]) => ({
          date,
          ...data
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      // Get top performing campaigns
      const campaignPerformance = {};
      clicks.forEach(click => {
        const campaignTitle = click.campaigns?.title || 'Unknown';
        if (!campaignPerformance[campaignTitle]) {
          campaignPerformance[campaignTitle] = { 
            clicks: 0, 
            validClicks: 0, 
            earnings: 0,
            payout: click.campaigns?.payout_per_click || 0
          };
        }
        campaignPerformance[campaignTitle].clicks++;
        if (click.is_valid) {
          campaignPerformance[campaignTitle].validClicks++;
          campaignPerformance[campaignTitle].earnings += parseFloat(click.payout_amount || 0);
        }
      });

      const topCampaigns = Object.entries(campaignPerformance)
        .map(([title, data]) => ({
          title,
          ...data,
          conversionRate: data.clicks > 0 ? ((data.validClicks / data.clicks) * 100).toFixed(2) : 0
        }))
        .sort((a, b) => b.earnings - a.earnings)
        .slice(0, 5);

      return {
        data: {
          overview: {
            totalClicks,
            validClicks,
            invalidClicks: totalClicks - validClicks,
            conversionRate: totalClicks > 0 ? ((validClicks / totalClicks) * 100).toFixed(2) : 0,
            totalEarnings: totalEarnings.toFixed(2),
            pendingEarnings: pendingEarnings.toFixed(2),
            paidEarnings: paidEarnings.toFixed(2),
            activeLinks: links.filter(l => l.campaigns?.is_active).length,
            totalLinks: links.length
          },
          chartData,
          topCampaigns,
          recentEarnings: earnings
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 10)
            .map(e => ({
              id: e.id,
              campaign: e.campaigns?.title || 'Unknown',
              amount: e.amount,
              status: e.status,
              created_at: e.created_at
            }))
        },
        error: null
      };
    } catch (error) {
      console.error('Error fetching promoter dashboard:', error);
      return { data: null, error };
    }
  },

  // Get real-time click stream
  async subscribeToClicks(campaignId, callback) {
    const channel = supabase
      .channel('clicks')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'clicks',
          filter: campaignId ? `campaign_id=eq.${campaignId}` : undefined
        },
        payload => {
          callback(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};