import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { verifyClick } from '../lib/clickVerification';

export default function Track() {
  const { shortCode } = useParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Verifying your click...');

  useEffect(() => {
    const processClick = async () => {
      try {
        let ipAddress = 'unknown';
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          ipAddress = ipData.ip || 'unknown';
        } catch (error) {
          console.error('Error fetching IP:', error);
        }

        const userAgent = navigator.userAgent || '';

        const { data: trackingLink, error: linkError } = await supabase
          .from('tracking_links')
          .select(`
            id,
            campaign_id,
            promoter_id,
            campaigns (
              id,
              destination_url,
              payout_per_click,
              is_active,
              remaining_budget
            )
          `)
          .eq('short_code', shortCode)
          .single();

        if (linkError || !trackingLink) {
          setStatus('error');
          setMessage('Invalid tracking link. This link may have been removed or does not exist.');
          return;
        }

        const campaign = trackingLink.campaigns;

        if (!campaign.is_active) {
          setStatus('error');
          setMessage('This campaign is no longer active.');
          return;
        }

        const verification = await verifyClick(
          ipAddress,
          userAgent,
          trackingLink.id,
          campaign.id,
          campaign.payout_per_click
        );

        const { data: clickData, error: clickError } = await supabase
          .from('clicks')
          .insert({
            tracking_link_id: trackingLink.id,
            campaign_id: campaign.id,
            promoter_id: trackingLink.promoter_id,
            ip_address: ipAddress,
            user_agent: userAgent,
            is_valid: verification.is_valid,
            payout_amount: verification.is_valid ? campaign.payout_per_click : 0,
          })
          .select()
          .single();

        if (clickError) {
          console.error('Error recording click:', clickError);
          setStatus('error');
          setMessage('An error occurred while processing your click.');
          return;
        }

        if (verification.is_valid && clickData) {
          const { error: earningError } = await supabase
            .from('earnings')
            .insert({
              promoter_id: trackingLink.promoter_id,
              campaign_id: campaign.id,
              click_id: clickData.id,
              amount: campaign.payout_per_click,
              status: 'pending',
            });

          if (earningError) {
            console.error('Error recording earning:', earningError);
          }

          setStatus('success');
          setMessage('Click verified! Redirecting...');
        } else {
          setStatus('warning');
          setMessage(verification.reason || 'Click could not be verified.');
        }

        setTimeout(() => {
          window.location.href = campaign.destination_url;
        }, 2000);

      } catch (error) {
        console.error('Error processing click:', error);
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again later.');
      }
    };

    processClick();
  }, [shortCode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
            </div>
            <h2 className="text-2xl font-bold text-white">Processing...</h2>
            <p className="text-gray-300">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-green-500 rounded-full p-3">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white">Success!</h2>
            <p className="text-gray-300">{message}</p>
          </div>
        )}

        {status === 'warning' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-yellow-500 rounded-full p-3">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white">Notice</h2>
            <p className="text-gray-300">{message}</p>
            <p className="text-sm text-gray-400">Redirecting to destination...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-red-500 rounded-full p-3">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white">Error</h2>
            <p className="text-gray-300">{message}</p>
            <p className="text-sm text-gray-400">Please contact support if this issue persists.</p>
          </div>
        )}
      </div>
    </div>
  );
}
