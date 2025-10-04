import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const CreateCampaign = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    destination_url: '',
    budget: '',
    payout_per_click: ''
  });

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    
    if (!formData.destination_url.trim()) {
      setError('Destination URL is required');
      return false;
    }

    try {
      new URL(formData.destination_url);
    } catch {
      setError('Please enter a valid URL');
      return false;
    }

    const budget = parseFloat(formData.budget);
    const payout = parseFloat(formData.payout_per_click);

    if (isNaN(budget) || budget <= 0) {
      setError('Budget must be a positive number');
      return false;
    }

    if (isNaN(payout) || payout <= 0) {
      setError('Payout per click must be a positive number');
      return false;
    }

    if (payout >= budget) {
      setError('Payout per click must be less than total budget');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error: insertError } = await supabase
        .from('campaigns')
        .insert([
          {
            marketer_id: user.id,
            title: formData.title,
            description: formData.description,
            destination_url: formData.destination_url,
            budget: parseFloat(formData.budget),
            payout_per_click: parseFloat(formData.payout_per_click),
            remaining_budget: parseFloat(formData.budget),
            is_active: true
          }
        ])
        .select();

      if (insertError) throw insertError;

      navigate('/marketer/campaigns');
    } catch (err) {
      console.error('Error creating campaign:', err);
      setError(err.message || 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              My Campaigns
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-12 mx-auto max-w-4xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-normal text-white">Create Campaign</h1>
          <p className="mt-2 text-gray-400">Launch a new campaign and connect with promoters</p>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25"></div>
          <div className="relative bg-gray-900 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="Enter campaign title"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="Describe your campaign..."
                />
              </div>

              <div>
                <label htmlFor="destination_url" className="block text-sm font-medium text-gray-300 mb-2">
                  Destination URL *
                </label>
                <input
                  type="url"
                  id="destination_url"
                  name="destination_url"
                  value={formData.destination_url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                    Total Budget ($) *
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    step="0.01"
                    min="0.01"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                    placeholder="100.00"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="payout_per_click" className="block text-sm font-medium text-gray-300 mb-2">
                    Payout per Click ($) *
                  </label>
                  <input
                    type="number"
                    id="payout_per_click"
                    name="payout_per_click"
                    value={formData.payout_per_click}
                    onChange={handleChange}
                    step="0.01"
                    min="0.01"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                    placeholder="0.50"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/marketer/campaigns')}
                  className="px-6 py-3 text-base font-semibold text-gray-400 hover:text-white transition"
                  disabled={loading}
                >
                  Cancel
                </button>
                <div className="relative inline-flex items-center justify-center group flex-1">
                  <div className="absolute transition-all duration-200 rounded-lg -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative inline-flex items-center justify-center w-full px-6 py-3 text-base font-semibold text-white bg-black border border-transparent rounded-lg disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Campaign'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCampaign;
