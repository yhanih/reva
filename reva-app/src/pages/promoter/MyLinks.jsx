import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const MyLinks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState({});

  useEffect(() => {
    fetchLinks();
  }, [user]);

  const fetchLinks = async () => {
    try {
      const { data: linksData, error: linksError } = await supabase
        .from('tracking_links')
        .select(`
          *,
          campaign:campaigns(title, payout_per_click)
        `)
        .eq('promoter_id', user.id)
        .order('created_at', { ascending: false });

      if (linksError) throw linksError;

      const linksWithStats = await Promise.all(
        linksData?.map(async (link) => {
          const { data: clicksData, error: clicksError } = await supabase
            .from('clicks')
            .select('id, is_valid, payout_amount, created_at')
            .eq('tracking_link_id', link.id);

          if (clicksError) throw clicksError;

          const totalClicks = clicksData?.length || 0;
          const validClicks = clicksData?.filter(click => click.is_valid).length || 0;
          const totalEarnings = clicksData?.reduce((sum, click) => 
            sum + (click.is_valid ? parseFloat(click.payout_amount || 0) : 0), 0) || 0;

          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const clicksToday = clicksData?.filter(click => 
            new Date(click.created_at) >= today
          ).length || 0;

          return {
            ...link,
            totalClicks,
            validClicks,
            totalEarnings,
            clicksToday
          };
        }) || []
      );

      setLinks(linksWithStats);
    } catch (err) {
      console.error('Error fetching links:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (shortCode, linkId) => {
    const trackingUrl = `${window.location.origin}/track/${shortCode}`;
    try {
      await navigator.clipboard.writeText(trackingUrl);
      setCopiedLink(prev => ({ ...prev, [linkId]: true }));
      setTimeout(() => {
        setCopiedLink(prev => ({ ...prev, [linkId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const totalEarnings = links.reduce((sum, link) => sum + link.totalEarnings, 0);
  const totalClicks = links.reduce((sum, link) => sum + link.totalClicks, 0);

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
              <span className="text-2xl font-bold text-white">My Links</span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur opacity-20"></div>
            <div className="relative bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="text-3xl font-bold text-white">${totalEarnings.toFixed(2)}</div>
              <div className="text-sm text-gray-400 mt-1">Total Earnings</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-20"></div>
            <div className="relative bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="text-3xl font-bold text-white">{totalClicks}</div>
              <div className="text-sm text-gray-400 mt-1">Total Clicks</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">You haven't created any tracking links yet.</p>
            <button
              onClick={() => navigate('/promoter/campaigns')}
              className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg hover:opacity-90 transition"
            >
              Browse Campaigns
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.id} className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur opacity-10"></div>
                <div className="relative bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {link.campaign?.title || 'Campaign'}
                      </h3>
                      <div className="bg-black rounded-lg p-3 border border-gray-800 mb-3">
                        <div className="text-xs text-gray-400 mb-1">Tracking link:</div>
                        <div className="text-cyan-400 text-sm font-mono break-all">
                          {window.location.origin}/track/{link.short_code}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <div className="text-sm text-gray-400">Total Clicks</div>
                          <div className="text-white font-semibold">{link.totalClicks}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Valid Clicks</div>
                          <div className="text-green-400 font-semibold">{link.validClicks}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Today</div>
                          <div className="text-purple-400 font-semibold">{link.clicksToday}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Earnings</div>
                          <div className="text-green-400 font-semibold">${link.totalEarnings.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(link.short_code, link.id)}
                      className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg hover:opacity-90 transition whitespace-nowrap"
                    >
                      {copiedLink[link.id] ? '✓ Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyLinks;
