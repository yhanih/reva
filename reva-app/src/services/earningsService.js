import { supabase } from '../lib/supabase';

export const earningsService = {
  // Get all earnings for current promoter
  async getPromoterEarnings() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('earnings')
        .select(`
          *,
          campaigns (
            title,
            payout_per_click
          ),
          clicks (
            created_at,
            ip_address
          )
        `)
        .eq('promoter_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Calculate summary statistics
      const totalEarnings = data.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
      const pendingEarnings = data.filter(e => e.status === 'pending')
        .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
      const approvedEarnings = data.filter(e => e.status === 'approved')
        .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
      const paidEarnings = data.filter(e => e.status === 'paid')
        .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

      return {
        data: {
          earnings: data,
          summary: {
            total: totalEarnings,
            pending: pendingEarnings,
            approved: approvedEarnings,
            paid: paidEarnings,
            count: {
              total: data.length,
              pending: data.filter(e => e.status === 'pending').length,
              approved: data.filter(e => e.status === 'approved').length,
              paid: data.filter(e => e.status === 'paid').length
            }
          }
        },
        error: null
      };
    } catch (error) {
      console.error('Error fetching earnings:', error);
      return { data: null, error };
    }
  },

  // Get earnings by campaign
  async getEarningsByCampaign(campaignId) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('earnings')
        .select(`
          *,
          clicks (
            created_at,
            ip_address,
            user_agent
          )
        `)
        .eq('promoter_id', user.id)
        .eq('campaign_id', campaignId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const totalEarnings = data.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

      return {
        data: {
          earnings: data,
          total: totalEarnings
        },
        error: null
      };
    } catch (error) {
      console.error('Error fetching campaign earnings:', error);
      return { data: null, error };
    }
  },

  // Get earnings summary for dashboard
  async getEarningsSummary() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get earnings grouped by date for the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data, error } = await supabase
        .from('earnings')
        .select('amount, status, created_at')
        .eq('promoter_id', user.id)
        .gte('created_at', thirtyDaysAgo.toISOString());

      if (error) throw error;

      // Group by date
      const earningsByDate = {};
      data.forEach(earning => {
        const date = new Date(earning.created_at).toLocaleDateString();
        if (!earningsByDate[date]) {
          earningsByDate[date] = { total: 0, pending: 0, approved: 0, paid: 0 };
        }
        const amount = parseFloat(earning.amount || 0);
        earningsByDate[date].total += amount;
        earningsByDate[date][earning.status] += amount;
      });

      // Convert to array and sort
      const chartData = Object.entries(earningsByDate)
        .map(([date, amounts]) => ({
          date,
          ...amounts
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      // Get total earnings by status
      const summary = data.reduce((acc, earning) => {
        const amount = parseFloat(earning.amount || 0);
        acc.total += amount;
        acc[earning.status] += amount;
        return acc;
      }, { total: 0, pending: 0, approved: 0, paid: 0 });

      return {
        data: {
          summary,
          chartData,
          recentEarnings: data.slice(0, 10)
        },
        error: null
      };
    } catch (error) {
      console.error('Error fetching earnings summary:', error);
      return { data: null, error };
    }
  },

  // Request payout (for promoters)
  async requestPayout() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get all approved earnings
      const { data: approvedEarnings, error: fetchError } = await supabase
        .from('earnings')
        .select('*')
        .eq('promoter_id', user.id)
        .eq('status', 'approved');

      if (fetchError) throw fetchError;

      if (!approvedEarnings || approvedEarnings.length === 0) {
        throw new Error('No approved earnings available for payout');
      }

      const totalAmount = approvedEarnings.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

      // In a real application, this would trigger a payout process
      // For now, we'll just update the status to 'paid'
      const earningIds = approvedEarnings.map(e => e.id);

      const { error: updateError } = await supabase
        .from('earnings')
        .update({ status: 'paid' })
        .in('id', earningIds);

      if (updateError) throw updateError;

      return {
        data: {
          message: 'Payout requested successfully',
          amount: totalAmount,
          count: approvedEarnings.length
        },
        error: null
      };
    } catch (error) {
      console.error('Error requesting payout:', error);
      return { data: null, error };
    }
  }
};