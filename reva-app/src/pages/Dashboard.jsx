import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const Dashboard = () => {
  const { user, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalBudget: 0,
    totalSpent: 0,
    totalClicks: 0,
    validClicks: 0,
    campaigns: []
  });
  const [promoterStats, setPromoterStats] = useState({
    totalLinks: 0,
    totalClicks: 0,
    totalEarnings: 0,
    pendingEarnings: 0,
    recentEarnings: [],
    topCampaigns: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userRole === 'marketer') {
      fetchMarketerStats();
    } else if (userRole === 'promoter') {
      fetchPromoterStats();
    } else {
      setLoading(false);
    }
  }, [user, userRole]);

  const fetchMarketerStats = async () => {
    try {
      const { data: campaignsData } = await supabase
        .from('campaigns')
        .select('id, budget, remaining_budget, is_active, created_at, title')
        .eq('marketer_id', user.id)
        .order('created_at', { ascending: false });

      const totalCampaigns = campaignsData?.length || 0;
      const activeCampaigns = campaignsData?.filter(c => c.is_active).length || 0;
      const totalBudget = campaignsData?.reduce((sum, c) => sum + parseFloat(c.budget || 0), 0) || 0;
      const totalSpent = campaignsData?.reduce((sum, c) => sum + (parseFloat(c.budget || 0) - parseFloat(c.remaining_budget || 0)), 0) || 0;

      const { data: clicksData } = await supabase
        .from('clicks')
        .select('id, is_valid, created_at, campaign_id')
        .in('campaign_id', campaignsData?.map(c => c.id) || []);

      const totalClicks = clicksData?.length || 0;
      const validClicks = clicksData?.filter(c => c.is_valid).length || 0;

      setStats({
        totalCampaigns,
        activeCampaigns,
        totalBudget,
        totalSpent,
        totalClicks,
        validClicks,
        campaigns: campaignsData || []
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPromoterStats = async () => {
    try {
      const { data: linksData } = await supabase
        .from('tracking_links')
        .select('id, campaign_id')
        .eq('promoter_id', user.id);

      const totalLinks = linksData?.length || 0;

      const { data: clicksData } = await supabase
        .from('clicks')
        .select('id, created_at')
        .eq('promoter_id', user.id);

      const totalClicks = clicksData?.length || 0;

      const { data: earningsData } = await supabase
        .from('earnings')
        .select('amount, status, created_at, campaign:campaigns(title)')
        .eq('promoter_id', user.id)
        .order('created_at', { ascending: false });

      const totalEarnings = earningsData?.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0) || 0;
      const pendingEarnings = earningsData?.filter(e => e.status === 'pending').reduce((sum, e) => sum + parseFloat(e.amount || 0), 0) || 0;

      const campaignEarnings = {};
      earningsData?.forEach(earning => {
        const campaignTitle = earning.campaign?.title || 'Unknown Campaign';
        if (!campaignEarnings[campaignTitle]) {
          campaignEarnings[campaignTitle] = 0;
        }
        campaignEarnings[campaignTitle] += parseFloat(earning.amount || 0);
      });

      const topCampaigns = Object.entries(campaignEarnings)
        .map(([title, amount]) => ({ title, amount }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

      setPromoterStats({
        totalLinks,
        totalClicks,
        totalEarnings,
        pendingEarnings,
        recentEarnings: earningsData?.slice(0, 5) || [],
        topCampaigns
      });
    } catch (err) {
      console.error('Error fetching promoter stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="py-4 bg-black border-b border-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-white">reva</span>
              <span className="px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full">
                {userRole === 'marketer' ? 'Marketer' : 'Promoter'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-normal text-white">
            Welcome back!
          </h1>
          <p className="mt-2 text-gray-400">{user?.email}</p>
        </div>

        {userRole === 'marketer' ? (
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25"></div>
              <div className="relative bg-gray-900 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Marketer Dashboard</h2>
                <p className="text-gray-400 mb-6">
                  Create and manage your campaigns, track performance, and connect with promoters.
                </p>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                      <div className="bg-black rounded-lg p-6 border border-gray-800">
                        <div className="text-3xl font-bold text-white">{stats.totalCampaigns}</div>
                        <div className="text-sm text-gray-400 mt-1">Total Campaigns</div>
                      </div>
                      <div className="bg-black rounded-lg p-6 border border-gray-800">
                        <div className="text-3xl font-bold text-green-400">{stats.activeCampaigns}</div>
                        <div className="text-sm text-gray-400 mt-1">Active Campaigns</div>
                      </div>
                      <div className="bg-black rounded-lg p-6 border border-gray-800">
                        <div className="text-3xl font-bold text-white">${stats.totalBudget.toFixed(2)}</div>
                        <div className="text-sm text-gray-400 mt-1">Total Budget</div>
                      </div>
                      <div className="bg-black rounded-lg p-6 border border-gray-800">
                        <div className="text-3xl font-bold text-purple-400">${stats.totalSpent.toFixed(2)}</div>
                        <div className="text-sm text-gray-400 mt-1">Total Spent</div>
                      </div>
                      <div className="bg-black rounded-lg p-6 border border-gray-800">
                        <div className="text-3xl font-bold text-cyan-400">{stats.totalClicks}</div>
                        <div className="text-sm text-gray-400 mt-1">Total Clicks</div>
                      </div>
                      <div className="bg-black rounded-lg p-6 border border-gray-800">
                        <div className="text-3xl font-bold text-green-400">{stats.validClicks}</div>
                        <div className="text-sm text-gray-400 mt-1">Valid Clicks</div>
                      </div>
                    </div>

                    {stats.totalBudget > 0 && (
                      <div className="mb-6 bg-black rounded-lg p-6 border border-gray-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Budget Utilization</span>
                          <span className="text-sm font-semibold text-white">
                            {((stats.totalSpent / stats.totalBudget) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-cyan-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((stats.totalSpent / stats.totalBudget) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <span>Spent: ${stats.totalSpent.toFixed(2)}</span>
                          <span>Remaining: ${(stats.totalBudget - stats.totalSpent).toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    {stats.totalClicks > 0 && (
                      <div className="mb-6 bg-black rounded-lg p-6 border border-gray-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Click Validation Rate</span>
                          <span className="text-sm font-semibold text-white">
                            {((stats.validClicks / stats.totalClicks) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(stats.validClicks / stats.totalClicks) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <span>Valid: {stats.validClicks}</span>
                          <span>Invalid: {stats.totalClicks - stats.validClicks}</span>
                        </div>
                      </div>
                    )}

                    {stats.campaigns.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-3">Recent Campaigns</h3>
                        <div className="space-y-3">
                          {stats.campaigns.slice(0, 3).map((campaign) => {
                            const spent = parseFloat(campaign.budget) - parseFloat(campaign.remaining_budget);
                            const budgetProgress = (spent / parseFloat(campaign.budget)) * 100;
                            return (
                              <div key={campaign.id} className="bg-black rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition cursor-pointer" onClick={() => navigate(`/marketer/campaigns/${campaign.id}`)}>
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex-1">
                                    <h4 className="text-white font-medium">{campaign.title}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${campaign.is_active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                        {campaign.is_active ? 'Active' : 'Inactive'}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm text-gray-400">Budget</div>
                                    <div className="text-white font-semibold">${parseFloat(campaign.budget).toFixed(2)}</div>
                                  </div>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                                  <div 
                                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                                    style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between mt-1 text-xs text-gray-500">
                                  <span>${spent.toFixed(2)} spent</span>
                                  <span>${parseFloat(campaign.remaining_budget).toFixed(2)} left</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex gap-4 flex-wrap">
                      <div className="relative inline-flex items-center justify-center group">
                        <div className="absolute transition-all duration-200 rounded-lg -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                        <button 
                          onClick={() => navigate('/marketer/create-campaign')}
                          className="relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-black border border-transparent rounded-lg"
                        >
                          Create Campaign
                        </button>
                      </div>
                      <button
                        onClick={() => navigate('/marketer/campaigns')}
                        className="px-6 py-3 text-base font-semibold text-cyan-400 hover:text-cyan-300 transition"
                      >
                        My Campaigns →
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-25"></div>
              <div className="relative bg-gray-900 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Promoter Dashboard</h2>
                <p className="text-gray-400 mb-6">
                  Browse campaigns, share links, and track your earnings.
                </p>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-black rounded-lg p-6 border border-gray-800">
                        <div className="text-3xl font-bold text-white">{promoterStats.totalLinks}</div>
                        <div className="text-sm text-gray-400 mt-1">Total Links</div>
                      </div>
                      <div className="bg-black rounded-lg p-6 border border-gray-800">
                        <div className="text-3xl font-bold text-cyan-400">{promoterStats.totalClicks}</div>
                        <div className="text-sm text-gray-400 mt-1">Total Clicks</div>
                      </div>
                      <div className="bg-black rounded-lg p-6 border border-gray-800">
                        <div className="text-3xl font-bold text-green-400">${promoterStats.totalEarnings.toFixed(2)}</div>
                        <div className="text-sm text-gray-400 mt-1">Total Earnings</div>
                      </div>
                      <div className="bg-black rounded-lg p-6 border border-gray-800">
                        <div className="text-3xl font-bold text-yellow-400">${promoterStats.pendingEarnings.toFixed(2)}</div>
                        <div className="text-sm text-gray-400 mt-1">Pending Earnings</div>
                      </div>
                    </div>

                    {promoterStats.topCampaigns.length > 0 && (
                      <div className="mb-6 bg-black rounded-lg p-6 border border-gray-800">
                        <h3 className="text-lg font-semibold text-white mb-4">Top Performing Campaigns</h3>
                        <div className="space-y-3">
                          {promoterStats.topCampaigns.map((campaign, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                                  index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                  index === 1 ? 'bg-gray-400/20 text-gray-300' :
                                  'bg-orange-500/20 text-orange-400'
                                }`}>
                                  {index + 1}
                                </div>
                                <span className="text-white">{campaign.title}</span>
                              </div>
                              <span className="text-green-400 font-semibold">${campaign.amount.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {promoterStats.recentEarnings.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-3">Recent Earnings</h3>
                        <div className="space-y-2">
                          {promoterStats.recentEarnings.map((earning, index) => (
                            <div key={index} className="bg-black rounded-lg p-3 border border-gray-800 flex justify-between items-center">
                              <div>
                                <div className="text-white text-sm">{earning.campaign?.title || 'Unknown Campaign'}</div>
                                <div className="text-xs text-gray-500">
                                  {new Date(earning.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-green-400 font-semibold">${parseFloat(earning.amount).toFixed(2)}</div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  earning.status === 'paid' ? 'bg-cyan-500/20 text-cyan-400' :
                                  earning.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                  'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                  {earning.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {promoterStats.totalEarnings > 0 && promoterStats.totalClicks > 0 && (
                      <div className="mb-6 bg-black rounded-lg p-6 border border-gray-800">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Average Earning per Click</span>
                          <span className="text-2xl font-bold text-white">
                            ${(promoterStats.totalEarnings / promoterStats.totalClicks).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap gap-4">
                      <div className="relative inline-flex items-center justify-center group">
                        <div className="absolute transition-all duration-200 rounded-lg -inset-px bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:shadow-lg group-hover:shadow-purple-500/50"></div>
                        <button 
                          onClick={() => navigate('/promoter/campaigns')}
                          className="relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-black border border-transparent rounded-lg"
                        >
                          Browse Campaigns
                        </button>
                      </div>
                      <button
                        onClick={() => navigate('/promoter/links')}
                        className="px-6 py-3 text-base font-semibold text-purple-400 hover:text-purple-300 transition"
                      >
                        My Links →
                      </button>
                      <button
                        onClick={() => navigate('/promoter/earnings')}
                        className="px-6 py-3 text-base font-semibold text-cyan-400 hover:text-cyan-300 transition"
                      >
                        Earnings →
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
