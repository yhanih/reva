import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const CampaignDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [trackingLinks, setTrackingLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCampaignDetails();
  }, [id, user]);

  const fetchCampaignDetails = async () => {
    try {
      setLoading(true);
      setError('');

      const { data: campaignData, error: campaignError } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .eq('marketer_id', user.id)
        .single();

      if (campaignError) throw campaignError;

      const { data: linksData, error: linksError } = await supabase
        .from('tracking_links')
        .select(`
          *,
          promoter:profiles!tracking_links_promoter_id_fkey(email, full_name)
        `)
        .eq('campaign_id', id);

      if (linksError) throw linksError;

      const linksWithStats = await Promise.all(
        (linksData || []).map(async (link) => {
          const { data: clicksData } = await supabase
            .from('clicks')
            .select('id, is_valid, payout_amount, created_at')
            .eq('tracking_link_id', link.id);

          const totalClicks = clicksData?.length || 0;
          const validClicks = clicksData?.filter(c => c.is_valid).length || 0;
          const totalPayout = clicksData?.reduce((sum, c) => 
            sum + (c.is_valid ? parseFloat(c.payout_amount || 0) : 0), 0
          ) || 0;

          return {
            ...link,
            totalClicks,
            validClicks,
            totalPayout
          };
        })
      );

      const { data: allClicksData } = await supabase
        .from('clicks')
        .select('id, is_valid, payout_amount')
        .eq('campaign_id', id);

      const totalClicks = allClicksData?.length || 0;
      const validClicks = allClicksData?.filter(c => c.is_valid).length || 0;
      const totalPayout = allClicksData?.reduce((sum, c) => 
        sum + (c.is_valid ? parseFloat(c.payout_amount || 0) : 0), 0
      ) || 0;

      setCampaign({
        ...campaignData,
        totalClicks,
        validClicks,
        totalPayout
      });
      setTrackingLinks(linksWithStats);
    } catch (err) {
      console.error('Error fetching campaign details:', err);
      setError(err.message || 'Failed to load campaign details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Campaign not found'}</p>
          <button
            onClick={() => navigate('/marketer/campaigns')}
            className="text-cyan-400 hover:text-cyan-300 transition"
          >
            Back to Campaigns
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="py-4 bg-black border-b border-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-2xl font-bold text-white hover:text-cyan-400 transition"
            >
              reva
            </button>
            <button
              onClick={() => navigate('/marketer/campaigns')}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition"
            >
              Back to Campaigns
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-normal text-white">{campaign.title}</h1>
              <p className="mt-2 text-gray-400">{campaign.description || 'No description'}</p>
            </div>
            <span className={`px-4 py-2 text-sm font-medium rounded-full ${
              campaign.is_active
                ? 'bg-green-500/20 text-green-400'
                : 'bg-gray-500/20 text-gray-400'
            }`}>
              {campaign.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="relative mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25"></div>
          <div className="relative bg-gray-900 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Campaign Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-black rounded-lg p-6 border border-gray-800">
                <div className="text-3xl font-bold text-white">${parseFloat(campaign.budget).toFixed(2)}</div>
                <div className="text-sm text-gray-400 mt-1">Total Budget</div>
              </div>
              <div className="bg-black rounded-lg p-6 border border-gray-800">
                <div className="text-3xl font-bold text-cyan-400">${parseFloat(campaign.remaining_budget).toFixed(2)}</div>
                <div className="text-sm text-gray-400 mt-1">Remaining Budget</div>
              </div>
              <div className="bg-black rounded-lg p-6 border border-gray-800">
                <div className="text-3xl font-bold text-white">{campaign.totalClicks}</div>
                <div className="text-sm text-gray-400 mt-1">Total Clicks</div>
              </div>
              <div className="bg-black rounded-lg p-6 border border-gray-800">
                <div className="text-3xl font-bold text-green-400">{campaign.validClicks}</div>
                <div className="text-sm text-gray-400 mt-1">Valid Clicks</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-black rounded-lg p-4 border border-gray-800">
                <div className="text-sm text-gray-400">Payout per Click</div>
                <div className="text-2xl font-bold text-white mt-1">${parseFloat(campaign.payout_per_click).toFixed(2)}</div>
              </div>
              <div className="bg-black rounded-lg p-4 border border-gray-800">
                <div className="text-sm text-gray-400">Total Payout</div>
                <div className="text-2xl font-bold text-purple-400 mt-1">${campaign.totalPayout.toFixed(2)}</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="text-sm text-gray-400">Destination URL</div>
              <a 
                href={campaign.destination_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition break-all"
              >
                {campaign.destination_url}
              </a>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-25"></div>
          <div className="relative bg-gray-900 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Promoter Tracking Links</h2>
            
            {trackingLinks.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No promoters have created tracking links yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Promoter</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Short Code</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Total Clicks</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Valid Clicks</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Total Payout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trackingLinks.map((link) => (
                      <tr key={link.id} className="border-b border-gray-800/50 hover:bg-black/50 transition">
                        <td className="py-4 px-4 text-white">
                          {link.promoter?.full_name || link.promoter?.email || 'Unknown'}
                        </td>
                        <td className="py-4 px-4 text-cyan-400 font-mono text-sm">{link.short_code}</td>
                        <td className="py-4 px-4 text-right text-white">{link.totalClicks}</td>
                        <td className="py-4 px-4 text-right text-green-400">{link.validClicks}</td>
                        <td className="py-4 px-4 text-right text-purple-400">${link.totalPayout.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampaignDetails;
