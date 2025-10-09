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

  const estimatedClicks = formData.budget && formData.payout_per_click 
    ? Math.floor(parseFloat(formData.budget) / parseFloat(formData.payout_per_click))
    : 0;

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

    if (budget < 10) {
      setError('Minimum budget is $10');
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
    <div className="min-h-screen bg-gray-50">
      <header className="py-4 bg-white border-b border-gray-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-2xl font-bold text-gray-900 hover:text-cyan-400 transition"
            >
              reva
            </button>
            <button
              onClick={() => navigate('/marketer/campaigns')}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition"
            >
              My Campaigns
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-12 mx-auto max-w-4xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-normal text-gray-900">Create Campaign</h1>
          <p className="mt-2 text-gray-600">Launch a new campaign and connect with promoters</p>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-10"></div>
          <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">⚠️ {error}</p>
                </div>
              )}

              <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
                <p className="text-sm text-cyan-700">
                  💡 <strong>Tip:</strong> Set a competitive payout rate to attract more promoters. Higher payouts typically result in better campaign performance.
                </p>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="e.g., Summer Sale Promotion"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="Describe what promoters will be promoting..."
                />
                <p className="mt-1 text-xs text-gray-500">Help promoters understand your campaign and what they'll be sharing</p>
              </div>

              <div>
                <label htmlFor="destination_url" className="block text-sm font-medium text-gray-700 mb-2">
                  Destination URL *
                </label>
                <input
                  type="url"
                  id="destination_url"
                  name="destination_url"
                  value={formData.destination_url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="https://example.com/landing-page"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">Where users will be redirected after clicking the tracking link</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Total Budget ($) *
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    step="0.01"
                    min="10"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                    placeholder="100.00"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">Minimum: $10</p>
                </div>

                <div>
                  <label htmlFor="payout_per_click" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                    placeholder="0.50"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">Amount paid to promoters per valid click</p>
                </div>
              </div>

              {estimatedClicks > 0 && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-700">Estimated Valid Clicks:</span>
                    <span className="text-2xl font-bold text-gray-900">{estimatedClicks}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Based on your budget and payout rate. Actual clicks may vary due to fraud detection.
                  </p>
                </div>
              )}

              {parseFloat(formData.budget) > 0 && parseFloat(formData.payout_per_click) > 0 && parseFloat(formData.payout_per_click) > parseFloat(formData.budget) * 0.5 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    ⚠️ <strong>High payout rate:</strong> Your payout is more than 50% of your budget. This will result in fewer total clicks but may attract more promoters.
                  </p>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/marketer/campaigns')}
                  className="px-6 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 transition"
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
