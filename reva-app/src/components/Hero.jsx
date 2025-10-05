import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="">
      <header className="py-4 bg-black sm:py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="shrink-0">
              <a href="/" title="" className="flex">
                <span className="text-2xl font-bold text-white">reva</span>
              </a>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                className="text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
              >
                {!mobileMenuOpen ? (
                  <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>

            <nav className="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start">
              <a href="#campaigns" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white">
                Campaigns
              </a>
              <a href="#features" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white">
                Features
              </a>
              <a href="#pricing" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white">
                Pricing
              </a>
              <a href="#support" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white">
                Support
              </a>
            </nav>

            {user ? (
              <div className="hidden md:flex md:items-center md:gap-4">
                <Link
                  to="/dashboard"
                  className="text-base font-normal text-gray-400 hover:text-white transition-all duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-base font-normal text-gray-400 hover:text-white transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="relative hidden md:items-center md:justify-center md:inline-flex group">
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <Link to="/signup" className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full" role="button">
                  Start free trial
                </Link>
              </div>
            )}
          </div>

          {mobileMenuOpen && (
            <nav>
              <div className="flex flex-col pt-8 pb-4 space-y-6">
                <a href="#campaigns" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white">
                  Campaigns
                </a>
                <a href="#features" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white">
                  Features
                </a>
                <a href="#pricing" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white">
                  Pricing
                </a>
                <a href="#support" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white">
                  Support
                </a>
                {user ? (
                  <>
                    <Link to="/dashboard" className="text-base font-normal text-cyan-400 transition-all duration-200 hover:text-white">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-left text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="relative inline-flex items-center justify-center group">
                    <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                    <Link to="/signup" className="relative inline-flex items-center justify-center w-full px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full" role="button">
                      Start free trial
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <section className="relative py-12 overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
            <div>
              <h1 className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Where Sharing Meets Opportunity
              </h1>
              <p className="mt-4 text-lg font-normal text-gray-400 sm:mt-8">
                Turn everyday links into powerful growth engines. Reward real engagement and build trust between people and brands.
              </p>

              <form onSubmit={handleSearch} className="relative mt-8 rounded-full sm:mt-12">
                <div className="relative">
                  <div className="absolute rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                      <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Try fashion brands, tech products, etc."
                      className="block w-full py-4 pr-6 text-white placeholder-gray-500 bg-black border border-transparent rounded-full pl-14 sm:py-5 focus:border-transparent focus:ring-0"
                    />
                  </div>
                </div>
                <div className="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0">
                  <button type="submit" className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-black uppercase transition-all duration-200 bg-white rounded-full sm:w-auto sm:py-3 hover:opacity-90">
                    Find Campaigns
                  </button>
                </div>
              </form>

              <div className="mt-8 sm:mt-12">
                <p className="text-lg font-normal text-white">Trusted by growth-focused brands</p>
                <div className="flex items-center mt-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                          fill={`url(#gradient-${i})`}
                        />
                        <defs>
                          <linearGradient id={`gradient-${i}`} x1="3.07813" y1="3.8833" x2="23.0483" y2="6.90161" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                        </defs>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-base font-normal text-white">4.9/5</span>
                  <span className="ml-1 text-base font-normal text-gray-500">(Real reviews)</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0">
                <svg className="blur-3xl filter opacity-70" style={{ filter: 'blur(64px)' }} width="444" height="536" viewBox="0 0 444 536" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
                    fill="url(#glow)"
                  />
                  <defs>
                    <linearGradient id="glow" x1="82.7339" y1="550.792" x2="-39.945" y2="118.965" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="relative w-full max-w-md mx-auto flex items-center justify-center">
                <div className="text-center">
                  <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <g className="connection-lines">
                      <line x1="200" y1="100" x2="280" y2="180" stroke="url(#line-gradient)" strokeWidth="2" strokeLinecap="round" />
                      <line x1="200" y1="100" x2="120" y2="180" stroke="url(#line-gradient)" strokeWidth="2" strokeLinecap="round" />
                      <line x1="280" y1="180" x2="200" y2="300" stroke="url(#line-gradient)" strokeWidth="2" strokeLinecap="round" />
                    </g>
                    
                    <circle cx="200" cy="100" r="60" fill="url(#circle-gradient)" className="animate-pulse" style={{ animationDuration: '3s' }} />
                    <circle cx="200" cy="100" r="56" fill="#000" />
                    <text x="200" y="115" textAnchor="middle" fontSize="40">👤</text>
                    <text x="200" y="155" textAnchor="middle" fontSize="10" fill="#06b6d4" fontWeight="600">Marketer</text>
                    
                    <circle cx="280" cy="180" r="50" fill="url(#circle-gradient)" className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                    <circle cx="280" cy="180" r="46" fill="#000" />
                    <text x="280" y="193" textAnchor="middle" fontSize="32">💼</text>
                    <text x="280" y="225" textAnchor="middle" fontSize="9" fill="#a855f7" fontWeight="600">Campaign</text>
                    
                    <circle cx="120" cy="180" r="50" fill="url(#circle-gradient)" className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
                    <circle cx="120" cy="180" r="46" fill="#000" />
                    <text x="120" y="193" textAnchor="middle" fontSize="32">🔗</text>
                    <text x="120" y="225" textAnchor="middle" fontSize="9" fill="#06b6d4" fontWeight="600">Link Share</text>
                    
                    <circle cx="200" cy="300" r="55" fill="url(#circle-gradient)" className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
                    <circle cx="200" cy="300" r="51" fill="#000" />
                    <text x="200" y="315" textAnchor="middle" fontSize="36">💰</text>
                    <text x="200" y="350" textAnchor="middle" fontSize="10" fill="#a855f7" fontWeight="600">Rewards</text>
                    
                    <defs>
                      <linearGradient id="circle-gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                      <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
