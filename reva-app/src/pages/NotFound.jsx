import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <svg className="blur-3xl filter opacity-30" style={{ filter: 'blur(64px)' }} width="100%" height="100%" viewBox="0 0 444 536" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
            fill="url(#gradient404)"
          />
          <defs>
            <linearGradient id="gradient404" x1="82.7339" y1="550.792" x2="-39.945" y2="118.965" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-4">
            404
          </h1>
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-gray-900 rounded-2xl px-8 py-4 border border-gray-800">
              <h2 className="text-3xl md:text-4xl font-semibold text-white">
                Page Not Found
              </h2>
            </div>
          </div>
        </div>

        <p className="text-xl text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="relative inline-flex items-center justify-center group">
            <div className="absolute transition-all duration-200 rounded-lg -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
            <button 
              onClick={() => navigate('/')}
              className="relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-black border border-transparent rounded-lg"
            >
              Go Home
            </button>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 text-base font-semibold text-gray-400 hover:text-white transition"
          >
            ← Go Back
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-cyan-400 hover:text-cyan-300 transition text-sm"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="text-purple-400 hover:text-purple-300 transition text-sm"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-cyan-400 hover:text-cyan-300 transition text-sm"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-purple-400 hover:text-purple-300 transition text-sm"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
