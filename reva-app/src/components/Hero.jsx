import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pattern from './Pattern';

const Hero = () => {
    const [expanded, setExpanded] = useState(false);
    const [customerType, setCustomerType] = useState('marketer');
    const [isAutoRotating, setIsAutoRotating] = useState(true);

    // Auto-rotate between customer types
    useEffect(() => {
        if (!isAutoRotating) return;
        
        const interval = setInterval(() => {
            setCustomerType(prev => prev === 'marketer' ? 'promoter' : 'marketer');
        }, 4000); // Rotate every 4 seconds

        return () => clearInterval(interval);
    }, [isAutoRotating]);

    // Persist user preference
    useEffect(() => {
        const savedType = localStorage.getItem('customerType');
        if (savedType) {
            setCustomerType(savedType);
            setIsAutoRotating(false);
        }
    }, []);

    // Dynamic content based on customer type
    const headlines = {
        marketer: {
            main: "Launch performance campaigns that actually",
            highlight: "convert",
            subtitle: "Track real engagement. Pay only for results. Grow smarter, not harder.",
            cta: "Create Campaign",
            stats: {
                campaigns: "10,000+",
                statLabel: "Active Campaigns",
                roi: "3.2x",
                roiLabel: "Average ROI"
            }
        },
        promoter: {
            main: "Earn real money from your",
            highlight: "influence",
            subtitle: "Share links, drive clicks, and get rewarded for authentic engagement.",
            cta: "Start Earning",
            stats: {
                campaigns: "$2.5M+",
                statLabel: "Paid to Promoters",
                roi: "$450",
                roiLabel: "Avg. Monthly Earnings"
            }
        }
    };

    const currentContent = headlines[customerType];

    const handleTypeChange = (type) => {
        setCustomerType(type);
        setIsAutoRotating(false);
        localStorage.setItem('customerType', type);
    };

    return (
        <div className="overflow-x-hidden relative">
            <div className="absolute inset-0 overflow-hidden z-0">
                <Pattern />
            </div>
            <header className="py-4 md:py-6 relative z-20">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0">
                            <a href="#" title="" className="flex">
                                <span className="text-2xl font-bold tracking-tight text-gray-900">Reva</span>
                            </a>
                        </div>

                        <div className="flex lg:hidden">
                            <button type="button" className="text-gray-900" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
                                {!expanded && (
                                    <span aria-hidden="true">
                                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </span>
                                )}

                                {expanded && (
                                    <span aria-hidden="true">
                                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10 xl:space-x-16">
                            <a href="#" title="" className="text-base font-medium text-gray-700 transition-all duration-200 rounded focus:outline-none hover:text-gray-900 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Features</a>

                            <a href="#" title="" className="text-base font-medium text-gray-700 transition-all duration-200 rounded focus:outline-none hover:text-gray-900 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">How It Works</a>

                            <a href="#" title="" className="text-base font-medium text-gray-700 transition-all duration-200 rounded focus:outline-none hover:text-gray-900 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Pricing</a>
                        </div>

                        <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10">
                            <a href="#" title="" className="text-base font-medium text-gray-700 transition-all duration-200 rounded focus:outline-none hover:text-gray-900 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Login</a>

                            <a
                                href="#"
                                title=""
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                role="button"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>

                    {expanded && (
                        <nav>
                            <div className="px-1 py-8">
                                <div className="grid gap-y-6">
                                    <a href="#" title="" className="flex items-center p-3 -m-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-xl hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Features</a>

                                    <a href="#" title="" className="flex items-center p-3 -m-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-xl hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">How It Works</a>

                                    <a href="#" title="" className="flex items-center p-3 -m-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-xl hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Pricing</a>

                                    <a href="#" title="" className="flex items-center p-3 -m-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-xl hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Login</a>

                                    <a
                                        href="#"
                                        title=""
                                        className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                        role="button"
                                    >
                                        Get Started
                                    </a>
                                </div>
                            </div>
                        </nav>
                    )}
                </div>
            </header>

            <section className="relative">
                {/* Radial gradient for premium depth */}
                <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent pointer-events-none z-10"></div>
                
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
                    <div className="max-w-3xl mx-auto text-center">
                        {/* Premium Segmented Control */}
                        <div className="flex justify-center mb-10">
                            <div className="relative inline-flex bg-gray-100/80 backdrop-blur-sm rounded-full p-1 shadow-xl shadow-gray-900/5">
                                {/* Sliding background indicator */}
                                <div
                                    className={`absolute inset-y-1 transition-all duration-300 ease-out ${
                                        customerType === 'marketer' ? 'left-1' : 'left-[50%]'
                                    } w-[calc(50%-4px)] bg-white rounded-full shadow-lg`}
                                />
                                
                                <button
                                    onClick={() => handleTypeChange('marketer')}
                                    className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                                        customerType === 'marketer'
                                            ? 'text-gray-900'
                                            : 'text-gray-600 hover:text-gray-900'
                                    } z-10`}
                                >
                                    I'm a Marketer
                                </button>
                                <button
                                    onClick={() => handleTypeChange('promoter')}
                                    className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                                        customerType === 'promoter'
                                            ? 'text-gray-900'
                                            : 'text-gray-600 hover:text-gray-900'
                                    } z-10`}
                                >
                                    I'm a Promoter
                                </button>
                            </div>
                        </div>

                        {/* Hero Content with Animations */}
                        <div className="transition-all duration-500 ease-out">
                            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 tracking-tight ${
                                customerType === 'marketer' ? 'animate-fade-in-up' : 'animate-fade-in-up'
                            }`}>
                                {currentContent.main}
                                <span className="relative inline-block ml-2">
                                    {/* Neon glow effect */}
                                    <span className={`absolute inset-0 ${
                                        customerType === 'marketer' 
                                            ? 'bg-gradient-to-r from-cyan-400 to-blue-500' 
                                            : 'bg-gradient-to-r from-purple-400 to-pink-500'
                                    } blur-2xl opacity-60 scale-150`}></span>
                                    <span className={`relative bg-gradient-to-r ${
                                        customerType === 'marketer' 
                                            ? 'from-cyan-500 to-blue-600' 
                                            : 'from-purple-500 to-pink-600'
                                    } bg-clip-text text-transparent`}> {currentContent.highlight}</span>
                                </span>
                            </h1>
                            
                            <p className="mt-6 text-xl text-gray-600 font-medium max-w-2xl mx-auto">
                                {currentContent.subtitle}
                            </p>
                        </div>

                        {/* Premium CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                            <Link
                                to="/signup"
                                className={`group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-2xl ${
                                    customerType === 'marketer' 
                                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700' 
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                                } transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20`}
                            >
                                <span className="relative z-10">{currentContent.cta}</span>
                                <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                            </Link>
                            
                            <Link
                                to="/login"
                                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 bg-white border-2 border-gray-200 rounded-2xl transition-all duration-300 hover:border-gray-400 hover:shadow-xl hover:shadow-black/10 transform hover:scale-[1.02]"
                            >
                                <span className="relative z-10">Sign In</span>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{currentContent.stats.campaigns}</span>
                                <span className="text-gray-400">{currentContent.statLabel}</span>
                            </div>
                            <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span>{currentContent.stats.roi}</span>
                                <span className="text-gray-400">{currentContent.stats.roiLabel}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Section */}
                <div className="mt-20 py-12 border-t border-gray-200">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Trusted by leading companies</p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                            {/* Company logos as text for now */}
                            <div className="text-2xl font-bold text-gray-400">TechCorp</div>
                            <div className="text-2xl font-bold text-gray-400">StartupX</div>
                            <div className="text-2xl font-bold text-gray-400">Growth Co.</div>
                            <div className="text-2xl font-bold text-gray-400">Digital Inc.</div>
                            <div className="text-2xl font-bold text-gray-400">Scale Labs</div>
                        </div>
                        
                        {/* Testimonial */}
                        <div className="mt-12 max-w-2xl mx-auto text-center">
                            <blockquote className="relative">
                                <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-200" fill="currentColor" viewBox="0 0 32 32">
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                </svg>
                                <p className="text-lg font-medium text-gray-700">
                                    "Reva transformed our marketing strategy. We're seeing 3x better ROI compared to traditional advertising channels."
                                </p>
                                <div className="mt-4">
                                    <p className="text-base font-semibold text-gray-900">Sarah Chen</p>
                                    <p className="text-sm text-gray-600">Head of Growth, TechCorp</p>
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* Dashboard Mockup with Glassmorphism */}
                <div className="pb-20 mt-20">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="relative">
                            {/* Glassmorphism container */}
                            <div className="relative mx-auto max-w-5xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-3xl"></div>
                                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-2">
                                    <div className="bg-gray-900 rounded-2xl overflow-hidden">
                                        {/* Mock browser bar */}
                                        <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                                            <div className="flex gap-1.5">
                                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            </div>
                                            <div className="flex-1 flex justify-center">
                                                <div className="bg-gray-700 rounded px-4 py-1 text-xs text-gray-400">
                                                    reva.app/dashboard
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Dashboard content */}
                                        <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
                                            <div className="grid grid-cols-3 gap-4 mb-8">
                                                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/20">
                                                    <div className="text-3xl font-bold text-white mb-2">$24,850</div>
                                                    <div className="text-sm text-gray-400">Total Revenue</div>
                                                </div>
                                                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                                                    <div className="text-3xl font-bold text-white mb-2">89.2%</div>
                                                    <div className="text-sm text-gray-400">Conversion Rate</div>
                                                </div>
                                                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20">
                                                    <div className="text-3xl font-bold text-white mb-2">12,450</div>
                                                    <div className="text-sm text-gray-400">Total Clicks</div>
                                                </div>
                                            </div>
                                            
                                            {/* Mock chart */}
                                            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                                                <div className="h-48 flex items-end justify-between gap-2">
                                                    <div className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t" style={{height: '60%'}}></div>
                                                    <div className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t" style={{height: '80%'}}></div>
                                                    <div className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t" style={{height: '45%'}}></div>
                                                    <div className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t" style={{height: '90%'}}></div>
                                                    <div className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t" style={{height: '75%'}}></div>
                                                    <div className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t" style={{height: '95%'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
