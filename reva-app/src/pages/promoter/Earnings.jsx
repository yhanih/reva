import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const Earnings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [earnings, setEarnings] = useState([]);
  const [campaignBreakdown, setCampaignBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  useEffect(() => {
    fetchEarnings();
  }, [user]);

  const fetchEarnings = async () => {
    try {
      const { data: earningsData, error: earningsError } = await supabase
        .from('earnings')
        .select(`
          *,
          campaign:campaigns(title)
        `)
        .eq('promoter_id', user.id)
        .order('created_at', { ascending: false });

      if (earningsError) throw earningsError;

      setEarnings(earningsData || []);

      const breakdown = {};
      earningsData?.forEach(earning => {
        const campaignId = earning.campaign_id;
        const campaignTitle = earning.campaign?.title || 'Unknown Campaign';
        
        if (!breakdown[campaignId]) {
          breakdown[campaignId] = {
            campaignId,
            campaignTitle,
            totalEarnings: 0,
            pending: 0,
            approved: 0,
            paid: 0,
            count: 0
          };
        }
        
        breakdown[campaignId].totalEarnings += parseFloat(earning.amount);
        breakdown[campaignId][earning.status] += parseFloat(earning.amount);
        breakdown[campaignId].count += 1;
      });

      setCampaignBreakdown(Object.values(breakdown));
    } catch (err) {
      console.error('Error fetching earnings:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredEarnings = earnings.filter(earning => {
    if (filter !== 'all' && earning.status !== filter) return false;
    
    if (dateRange !== 'all') {
      const earningDate = new Date(earning.created_at);
      const now = new Date();
      
      if (dateRange === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (earningDate < today) return false;
      } else if (dateRange === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        if (earningDate < weekAgo) return false;
      } else if (dateRange === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        if (earningDate < monthAgo) return false;
      }
    }
    
    return true;
  });

  const totalEarnings = earnings.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const pendingEarnings = earnings.filter(e => e.status === 'pending').reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const approvedEarnings = earnings.filter(e => e.status === 'approved').reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const paidEarnings = earnings.filter(e => e.status === 'paid').reduce((sum, e) => sum + parseFloat(e.amount), 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'approved': return 'text-green-400';
      case 'paid': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'paid': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-4 bg-white border-b border-gray-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                ← Back
              </button>
              <span className="text-2xl font-bold text-gray-900">Earnings</span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur opacity-10"></div>
            <div className="relative bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-gray-900">${totalEarnings.toFixed(2)}</div>
              <div className="text-sm text-gray-600 mt-1">Total Earnings</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl blur opacity-10"></div>
            <div className="relative bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-yellow-400">${pendingEarnings.toFixed(2)}</div>
              <div className="text-sm text-gray-600 mt-1">Pending</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-10"></div>
            <div className="relative bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-green-400">${approvedEarnings.toFixed(2)}</div>
              <div className="text-sm text-gray-600 mt-1">Approved</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-10"></div>
            <div className="relative bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-cyan-400">${paidEarnings.toFixed(2)}</div>
              <div className="text-sm text-gray-600 mt-1">Paid</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {campaignBreakdown.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Earnings by Campaign</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {campaignBreakdown.map((campaign) => (
                    <div key={campaign.campaignId} className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur opacity-10"></div>
                      <div className="relative bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">{campaign.campaignTitle}</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Total:</span>
                            <span className="text-gray-900 font-semibold">${campaign.totalEarnings.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Pending:</span>
                            <span className="text-yellow-400">${campaign.pending.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Approved:</span>
                            <span className="text-green-400">${campaign.approved.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Paid:</span>
                            <span className="text-cyan-400">${campaign.paid.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Earnings</h2>
              <div className="flex gap-4 mb-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="paid">Paid</option>
                </select>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
            </div>

            {filteredEarnings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">No earnings to display.</p>
                <button
                  onClick={() => navigate('/promoter/campaigns')}
                  className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg hover:opacity-90 transition"
                >
                  Browse Campaigns
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredEarnings.map((earning) => (
                  <div key={earning.id} className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur opacity-5"></div>
                    <div className="relative bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="text-gray-900 font-semibold mb-1">
                            {earning.campaign?.title || 'Unknown Campaign'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {new Date(earning.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">${parseFloat(earning.amount).toFixed(2)}</div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(earning.status)}`}>
                            {earning.status.charAt(0).toUpperCase() + earning.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Earnings;
