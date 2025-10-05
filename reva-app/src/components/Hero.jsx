import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
    const [expanded, setExpanded] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative overflow-x-hidden bg-gradient-to-br from-[#0B1020] via-[#1a1f3a] to-[#0B1020] min-h-screen">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#36E0FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#FF7A6A] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <header className="relative py-6 md:py-8 z-20">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center space-x-2 group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#36E0FF] to-[#FF7A6A] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                                    <div className="relative bg-[#0B1020] px-3 py-2 rounded-lg border border-[#36E0FF]/30">
                                        <span className="text-2xl font-bold bg-gradient-to-r from-[#36E0FF] to-[#FF7A6A] bg-clip-text text-transparent">Reva</span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="flex lg:hidden">
                            <button 
                                type="button" 
                                className="text-white hover:text-[#36E0FF] transition-colors" 
                                onClick={() => setExpanded(!expanded)}
                            >
                                {!expanded ? (
                                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10">
                            <a href="#features" className="text-sm font-medium text-gray-300 hover:text-[#36E0FF] transition-all duration-200">Features</a>
                            <a href="#how-it-works" className="text-sm font-medium text-gray-300 hover:text-[#36E0FF] transition-all duration-200">How It Works</a>
                            <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-[#36E0FF] transition-all duration-200">Pricing</a>
                        </div>

                        <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-6">
                            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-[#36E0FF] transition-all duration-200">Login</Link>
                            <Link
                                to="/signup"
                                className="relative group px-6 py-3 text-sm font-bold text-white overflow-hidden rounded-xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#36E0FF] to-[#FF7A6A] transition-transform group-hover:scale-105"></div>
                                <span className="relative">Get Started</span>
                            </Link>
                        </div>
                    </div>

                    {expanded && (
                        <nav className="lg:hidden mt-8">
                            <div className="flex flex-col space-y-4">
                                <a href="#features" className="text-base font-medium text-gray-300 hover:text-[#36E0FF] transition-all duration-200 p-3 rounded-lg hover:bg-white/5">Features</a>
                                <a href="#how-it-works" className="text-base font-medium text-gray-300 hover:text-[#36E0FF] transition-all duration-200 p-3 rounded-lg hover:bg-white/5">How It Works</a>
                                <a href="#pricing" className="text-base font-medium text-gray-300 hover:text-[#36E0FF] transition-all duration-200 p-3 rounded-lg hover:bg-white/5">Pricing</a>
                                <Link to="/login" className="text-base font-medium text-gray-300 hover:text-[#36E0FF] transition-all duration-200 p-3 rounded-lg hover:bg-white/5">Login</Link>
                                <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-[#36E0FF] to-[#FF7A6A] rounded-xl hover:scale-105 transition-transform">Get Started</Link>
                            </div>
                        </nav>
                    )}
                </div>
            </header>

            <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative z-10 space-y-8">
                            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-[#36E0FF]/30 rounded-full px-4 py-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#36E0FF] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#36E0FF]"></span>
                                </span>
                                <span className="text-sm text-gray-300">Performance Marketing Reimagined</span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                                    Turn Links Into
                                </span>
                                <br />
                                <span className="relative inline-block mt-2">
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#36E0FF] via-[#FF44EC] to-[#FF7A6A] blur-2xl opacity-50"></span>
                                    <span className="relative bg-gradient-to-r from-[#36E0FF] via-[#FF44EC] to-[#FF7A6A] bg-clip-text text-transparent">
                                        Growth Engines
                                    </span>
                                </span>
                            </h1>

                            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                                Connect marketers with promoters. Track every click. Reward authentic engagement. Build trust between brands and audiences.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="group relative px-8 py-4 bg-gradient-to-r from-[#36E0FF] to-[#FF7A6A] rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#36E0FF]/50"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        Join as Marketer
                                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>

                                <button
                                    onClick={() => navigate('/signup')}
                                    className="group px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-[#36E0FF]/50 rounded-xl font-bold text-white hover:bg-white/10 hover:border-[#36E0FF] transition-all duration-300"
                                >
                                    <span className="flex items-center justify-center">
                                        Join as Promoter
                                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>
                            </div>

                            <div className="flex items-center space-x-8 pt-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-[#36E0FF] to-[#FF7A6A] bg-clip-text text-transparent">10K+</div>
                                    <div className="text-sm text-gray-400 mt-1">Active Users</div>
                                </div>
                                <div className="h-12 w-px bg-gradient-to-b from-transparent via-[#36E0FF] to-transparent"></div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-[#36E0FF] to-[#FF7A6A] bg-clip-text text-transparent">50M+</div>
                                    <div className="text-sm text-gray-400 mt-1">Tracked Clicks</div>
                                </div>
                                <div className="h-12 w-px bg-gradient-to-b from-transparent via-[#36E0FF] to-transparent"></div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-[#36E0FF] to-[#FF7A6A] bg-clip-text text-transparent">$2M+</div>
                                    <div className="text-sm text-gray-400 mt-1">Paid Out</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative lg:block hidden">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#36E0FF] to-[#FF7A6A] rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                                
                                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#36E0FF] to-[#FF7A6A] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                        Live Stats
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-[#36E0FF]/20">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-[#36E0FF] to-blue-500 rounded-lg flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-400">Click Rate</div>
                                                    <div className="text-xl font-bold text-white">+24.5%</div>
                                                </div>
                                            </div>
                                            <div className="text-2xl">📈</div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-[#FF7A6A]/20">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-[#FF7A6A] to-orange-500 rounded-lg flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-400">Active Campaigns</div>
                                                    <div className="text-xl font-bold text-white">1,247</div>
                                                </div>
                                            </div>
                                            <div className="text-2xl">💰</div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-purple-500/20">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-400">Promoters Online</div>
                                                    <div className="text-xl font-bold text-white">3,892</div>
                                                </div>
                                            </div>
                                            <div className="text-2xl">👥</div>
                                        </div>

                                        <div className="mt-6 p-4 bg-gradient-to-br from-[#36E0FF]/10 to-[#FF7A6A]/10 rounded-xl border border-white/10">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm text-gray-300">Real-time Activity</span>
                                                <span className="relative flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-[#36E0FF] to-[#FF7A6A] rounded-full animate-pulse" style={{ width: '75%' }}></div>
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

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1020] to-transparent"></div>
        </div>
    );
};

export default Hero;