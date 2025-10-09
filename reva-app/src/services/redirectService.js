import { supabase } from '../lib/supabase';

export const redirectService = {
  // Get client IP address
  async getClientIP() {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      return ipData.ip || 'unknown';
    } catch (error) {
      console.error('Error fetching IP:', error);
      return 'unknown';
    }
  },

  // Handle tracking link redirect
  async handleRedirect(shortCode) {
    try {
      // Get tracking link details
      const { data: trackingLink, error: linkError } = await supabase
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

      if (linkError || !trackingLink) {
        return { 
          success: false, 
          error: 'Invalid tracking link' 
        };
      }

      const campaign = trackingLink.campaigns;

      // Check if campaign is active and has budget
      if (!campaign || !campaign.is_active) {
        return { 
          success: false, 
          error: 'Campaign is not active' 
        };
      }

      if (parseFloat(campaign.remaining_budget) < parseFloat(campaign.payout_per_click)) {
        return { 
          success: false, 
          error: 'Campaign budget exhausted' 
        };
      }

      // Record the click
      const ipAddress = await this.getClientIP();
      const userAgent = navigator.userAgent;

      const { data: click, error: clickError } = await supabase
        .from('clicks')
        .insert([{
          tracking_link_id: trackingLink.id,
          campaign_id: trackingLink.campaign_id,
          promoter_id: trackingLink.promoter_id,
          ip_address: ipAddress,
          user_agent: userAgent,
          is_valid: false, // Will be validated by database trigger
          payout_amount: null
        }])
        .select()
        .single();

      if (clickError) {
        console.error('Error recording click:', clickError);
        // Still redirect even if click recording fails
      }

      return {
        success: true,
        destinationUrl: campaign.destination_url,
        click: click
      };
    } catch (error) {
      console.error('Error in redirect service:', error);
      return {
        success: false,
        error: 'An error occurred processing the redirect'
      };
    }
  }
};