import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const MyCampaigns = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, [user]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError('');

      const { data: campaignsData, error: campaignsError } = await supabase
        .from('campaigns')
        .select('*')
        .eq('marketer_id', user.id)
        .order('created_at', { ascending: false });

      if (campaignsError) throw campaignsError;

      const campaignsWithStats = await Promise.all(
        campaignsData.map(async (campaign) => {
          const { data: clicksData } = await supabase
            .from('clicks')
            .select('id, is_valid, payout_amount')
            .eq('campaign_id', campaign.id);

          const totalClicks = clicksData?.length || 0;
          const validClicks = clicksData?.filter(c => c.is_valid).length || 0;
          const totalSpent = clicksData?.reduce((sum, c) => sum + (c.is_valid ? parseFloat(c.payout_amount || 0) : 0), 0) || 0;

          return {
            ...campaign,
            totalClicks,
            validClicks,
            totalSpent
          };
        })
      );

      setCampaigns(campaignsWithStats);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError(err.message || 'Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const toggleCampaignStatus = async (campaignId, currentStatus) => {
    try {
      const { error: updateError } = await supabase
        .from('campaigns')
        .update({ is_active: !currentStatus })
        .eq('id', campaignId);

      if (updateError) throw updateError;

      setCampaigns(campaigns.map(c => 
        c.id === campaignId ? { ...c, is_active: !currentStatus } : c
      ));
    } catch (err) {
      console.error('Error toggling campaign status:', err);
      setError(err.message || 'Failed to update campaign status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading campaigns...</p>
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
              onClick={() => navigate('/marketer/create-campaign')}
              className="relative inline-flex items-center justify-center group"
            >
              <div className="absolute transition-all duration-200 rounded-lg -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
              <span className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-black border border-transparent rounded-lg">
                Create Campaign
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-normal text-white">My Campaigns</h1>
          <p className="mt-2 text-gray-400">Manage and track your marketing campaigns</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {campaigns.length === 0 ? (
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25"></div>
            <div className="relative bg-gray-900 rounded-2xl p-12 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">No campaigns yet</h3>
              <p className="text-gray-400 mb-6">Create your first campaign to get started</p>
              <button
                onClick={() => navigate('/marketer/create-campaign')}
                className="relative inline-flex items-center justify-center group"
              >
                <div className="absolute transition-all duration-200 rounded-lg -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <span className="relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-black border border-transparent rounded-lg">
                  Create Your First Campaign
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
                <div className="relative bg-gray-900 rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white flex-1">{campaign.title}</h3>
                    <button
                      onClick={() => toggleCampaignStatus(campaign.id, campaign.is_active)}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition ${
                        campaign.is_active
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                      }`}
                    >
                      {campaign.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </div>

                  {campaign.description && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{campaign.description}</p>
                  )}

                  <div className="space-y-3 mb-4 flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Budget:</span>
                      <span className="text-white font-medium">${parseFloat(campaign.budget).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Remaining:</span>
                      <span className="text-cyan-400 font-medium">${parseFloat(campaign.remaining_budget).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Payout/Click:</span>
                      <span className="text-white font-medium">${parseFloat(campaign.payout_per_click).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total Clicks:</span>
                      <span className="text-white font-medium">{campaign.totalClicks}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Valid Clicks:</span>
                      <span className="text-green-400 font-medium">{campaign.validClicks}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total Spent:</span>
                      <span className="text-purple-400 font-medium">${campaign.totalSpent.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/marketer/campaigns/${campaign.id}`)}
                    className="w-full py-2 px-4 bg-black border border-gray-700 rounded-lg text-cyan-400 hover:border-cyan-500 hover:text-cyan-300 transition text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyCampaigns;
