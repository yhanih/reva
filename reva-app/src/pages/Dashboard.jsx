import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, userRole, logout } = useAuth();
  const navigate = useNavigate();

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black rounded-lg p-6 border border-gray-800">
                    <div className="text-3xl font-bold text-white">0</div>
                    <div className="text-sm text-gray-400 mt-1">Active Campaigns</div>
                  </div>
                  <div className="bg-black rounded-lg p-6 border border-gray-800">
                    <div className="text-3xl font-bold text-white">0</div>
                    <div className="text-sm text-gray-400 mt-1">Total Clicks</div>
                  </div>
                  <div className="bg-black rounded-lg p-6 border border-gray-800">
                    <div className="text-3xl font-bold text-white">0</div>
                    <div className="text-sm text-gray-400 mt-1">Promoters</div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="relative inline-flex items-center justify-center group">
                    <div className="absolute transition-all duration-200 rounded-lg -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                    <button className="relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-black border border-transparent rounded-lg">
                      Create New Campaign
                    </button>
                  </div>
                </div>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black rounded-lg p-6 border border-gray-800">
                    <div className="text-3xl font-bold text-white">$0</div>
                    <div className="text-sm text-gray-400 mt-1">Total Earnings</div>
                  </div>
                  <div className="bg-black rounded-lg p-6 border border-gray-800">
                    <div className="text-3xl font-bold text-white">0</div>
                    <div className="text-sm text-gray-400 mt-1">Shares</div>
                  </div>
                  <div className="bg-black rounded-lg p-6 border border-gray-800">
                    <div className="text-3xl font-bold text-white">0</div>
                    <div className="text-sm text-gray-400 mt-1">Active Links</div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="relative inline-flex items-center justify-center group">
                    <div className="absolute transition-all duration-200 rounded-lg -inset-px bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:shadow-lg group-hover:shadow-purple-500/50"></div>
                    <button className="relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-black border border-transparent rounded-lg">
                      Browse Campaigns
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
