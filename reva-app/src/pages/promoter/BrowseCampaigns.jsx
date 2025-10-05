import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8);

const BrowseCampaigns = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingLink, setGeneratingLink] = useState({});
  const [copiedLink, setCopiedLink] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, [user]);

  const fetchCampaigns = async () => {
    try {
      const { data: campaignsData, error: campaignsError } = await supabase
        .from('campaigns')
        .select('*')
        .eq('is_active', true)
        .gt('remaining_budget', 0)
        .order('created_at', { ascending: false });

      if (campaignsError) throw campaignsError;

      const { data: linksData, error: linksError } = await supabase
        .from('tracking_links')
        .select('campaign_id, short_code')
        .eq('promoter_id', user.id);

      if (linksError) throw linksError;

      const linksMap = {};
      linksData?.forEach(link => {
        linksMap[link.campaign_id] = link.short_code;
      });

      const campaignsWithLinks = campaignsData?.map(campaign => ({
        ...campaign,
        existingLink: linksMap[campaign.id] || null
      })) || [];

      setCampaigns(campaignsWithLinks);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateTrackingLink = async (campaignId, campaignTitle) => {
    setGeneratingLink(prev => ({ ...prev, [campaignId]: true }));
    try {
      const shortCode = nanoid();
      
      const { data, error } = await supabase
        .from('tracking_links')
        .insert([
          {
            campaign_id: campaignId,
            promoter_id: user.id,
            short_code: shortCode
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setCampaigns(prev => prev.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, existingLink: shortCode }
          : campaign
      ));

      setSuccessMessage(`✓ Tracking link generated for "${campaignTitle}"! Start sharing to earn.`);
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      console.error('Error generating link:', err);
      alert('Failed to generate tracking link. Please try again.');
    } finally {
      setGeneratingLink(prev => ({ ...prev, [campaignId]: false }));
    }
  };

  const copyToClipboard = async (shortCode, campaignId) => {
    const trackingUrl = `${window.location.origin}/track/${shortCode}`;
    try {
      await navigator.clipboard.writeText(trackingUrl);
      setCopiedLink(prev => ({ ...prev, [campaignId]: true }));
      setTimeout(() => {
        setCopiedLink(prev => ({ ...prev, [campaignId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="py-4 bg-black border-b border-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-400 hover:text-white transition"
              >
                ← Back
              </button>
              <span className="text-2xl font-bold text-white">Browse Campaigns</span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg animate-fade-in">
            <p className="text-sm text-green-400">{successMessage}</p>
          </div>
        )}

        {!loading && campaigns.length > 0 && (
          <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <p className="text-sm text-purple-300">
              💡 <strong>Pro Tip:</strong> Share your tracking links on social media, blogs, or with your audience. You earn for every valid click!
            </p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No active campaigns available at the moment.</p>
            <p className="text-gray-500 text-sm">Check back soon for new opportunities!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur opacity-20"></div>
                <div className="relative bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-semibold text-white mb-2">{campaign.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{campaign.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Payout per click:</span>
                      <span className="text-green-400 font-semibold">${campaign.payout_per_click}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Budget remaining:</span>
                      <span className="text-purple-400 font-semibold">${parseFloat(campaign.remaining_budget).toFixed(2)}</span>
                    </div>
                  </div>

                  {campaign.existingLink ? (
                    <div className="space-y-3">
                      <div className="bg-black rounded-lg p-3 border border-gray-800">
                        <div className="text-xs text-gray-400 mb-1">Your tracking link:</div>
                        <div className="text-cyan-400 text-sm font-mono break-all">
                          {window.location.origin}/track/{campaign.existingLink}
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(campaign.existingLink, campaign.id)}
                        className="w-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg hover:opacity-90 transition"
                      >
                        {copiedLink[campaign.id] ? '✓ Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => generateTrackingLink(campaign.id, campaign.title)}
                      disabled={generatingLink[campaign.id]}
                      className="w-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                    >
                      {generatingLink[campaign.id] ? 'Generating...' : 'Generate Link'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowseCampaigns;
