import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { redirectService } from '../services/redirectService';

function RedirectPage() {
  const { shortCode } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRedirect = async () => {
      if (!shortCode) {
        setError('Invalid link');
        setLoading(false);
        return;
      }

      try {
        const result = await redirectService.handleRedirect(shortCode);
        
        if (result.success) {
          // Redirect to destination URL
          window.location.href = result.destinationUrl;
        } else {
          setError(result.error || 'Invalid or expired link');
          setLoading(false);
        }
      } catch (err) {
        console.error('Redirect error:', err);
        setError('An error occurred. Please try again.');
        setLoading(false);
      }
    };

    handleRedirect();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Link Error</h2>
          <p className="text-white/80 mb-6">{error}</p>
          <a href="/" className="inline-block bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors">
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return null;
}

export default RedirectPage;