import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Pattern from './Pattern';

const Hero = () => {
    const [expanded, setExpanded] = useState(false);
    const [customerType, setCustomerType] = useState('marketer');
    const [isAutoRotating, setIsAutoRotating] = useState(true);
    
    // Scroll tracking state
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isNavbarSticky, setIsNavbarSticky] = useState(false);
    const heroRef = useRef(null);
    const heroContentRef = useRef(null);

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
    
    // Scroll tracking for cinematic effects
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const heroHeight = heroRef.current?.offsetHeight || windowHeight;
            
            // Calculate scroll progress (0 to 1)
            const progress = Math.min(scrollY / (heroHeight * 0.8), 1);
            setScrollProgress(progress);
            
            // Make navbar sticky after scrolling past 50px
            setIsNavbarSticky(scrollY > 50);
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once to set initial state
        
        return () => window.removeEventListener('scroll', handleScroll);
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
    
    // Calculate dynamic values for animations
    const heroScale = 1 - scrollProgress * 0.1; // Scale down to 0.9
    const heroOpacity = 1 - scrollProgress * 0.8; // Fade to 0.2
    const heroTranslateY = scrollProgress * -100; // Move up 100px
    const contentParallax = scrollProgress * 50; // Slower parallax for content

    return (
        <div className="overflow-x-hidden relative">
            {/* Pattern background stays fixed */}
            <div className="fixed inset-0 overflow-hidden z-0">
                <Pattern />
            </div>
            
            {/* Sticky Navbar */}
            <header className={`${isNavbarSticky ? 'fixed top-0' : 'absolute'} left-0 right-0 py-4 md:py-6 z-50 transition-all duration-300`}>
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
                            <a href="#features" title="" className="text-base font-medium text-gray-700 transition-all duration-200 rounded focus:outline-none hover:text-gray-900 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Features</a>

                            <a href="#how-it-works" title="" className="text-base font-medium text-gray-700 transition-all duration-200 rounded focus:outline-none hover:text-gray-900 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">How It Works</a>

                            <a href="#pricing" title="" className="text-base font-medium text-gray-700 transition-all duration-200 rounded focus:outline-none hover:text-gray-900 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Pricing</a>
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
                                    <a href="#features" title="" className="flex items-center p-3 -m-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-xl hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Features</a>

                                    <a href="#how-it-works" title="" className="flex items-center p-3 -m-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-xl hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">How It Works</a>

                                    <a href="#pricing" title="" className="flex items-center p-3 -m-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-xl hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Pricing</a>

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

            {/* Hero Section with Cinematic Effects */}
            <section 
                ref={heroRef}
                className="relative min-h-screen"
                style={{
                    position: scrollProgress > 0.95 ? 'relative' : 'sticky',
                    top: 0,
                    transform: `scale(${heroScale}) translateY(${heroTranslateY}px)`,
                    opacity: heroOpacity,
                    transition: 'none', // Use CSS transform for smooth 60fps animation
                }}
            >
                {/* Add padding for sticky navbar when it appears */}
                <div className={`${isNavbarSticky ? 'pt-20' : ''} transition-all duration-300`}>
                    {/* Subtle radial gradient for depth */}
                    <div className="absolute inset-0 pointer-events-none z-10" style={{
                        background: 'radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.02) 0%, transparent 50%)'
                    }}></div>
                    
                    <div 
                        ref={heroContentRef}
                        className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20"
                        style={{
                            transform: `translateY(${contentParallax}px)`,
                            transition: 'none',
                        }}
                    >
                        <div className="max-w-3xl mx-auto text-center pt-20">
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
                            <h1 className="text-fluid-xl font-bold leading-tight text-gray-900 tracking-tight animate-fade-in-up">
                                {currentContent.main}
                                <span className="relative inline-block ml-2">
                                    {/* Subtle glow effect */}
                                    <span className={`absolute inset-0 ${
                                        customerType === 'marketer' 
                                            ? 'bg-cyan-500' 
                                            : 'bg-purple-500'
                                    } blur-xl opacity-20 scale-110`}></span>
                                    <span className={`relative ${
                                        customerType === 'marketer' 
                                            ? 'text-cyan-600' 
                                            : 'text-purple-600'
                                    } font-bold`}> {currentContent.highlight}</span>
                                </span>
                            </h1>
                            
                            <p className="mt-6 text-xl text-gray-600 font-medium max-w-2xl mx-auto">
                                {currentContent.subtitle}
                            </p>
                        </div>

                        {/* Simplified CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                            <Link
                                to="/signup"
                                className={`group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-lg ${
                                    customerType === 'marketer' 
                                        ? 'bg-cyan-600 hover:bg-cyan-700' 
                                        : 'bg-purple-600 hover:bg-purple-700'
                                } transform hover:scale-[1.02] hover:shadow-lg`}
                            >
                                <span className="relative z-10">{currentContent.cta}</span>
                            </Link>
                            
                            <Link
                                to="/login"
                                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-lg transition-all duration-300 hover:border-gray-300 hover:shadow-md transform hover:scale-[1.02]"
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
            </div>
            </section>

            {/* Content Sections with Reveal Effect */}
            <div className="relative bg-white z-30" style={{ minHeight: '100vh' }}>
                {/* Trust Section */}
                <div className="pt-20 pb-12 border-t border-gray-200">
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
                        
                        {/* Dashboard Mockup - Full Design */}
                        <div className="mt-20 pb-12">
                            <div className="relative">
                                <div className="absolute inset-0 h-2/3 bg-gray-50"></div>
                                <div className="relative mx-auto">
                                    <div className="lg:max-w-6xl lg:mx-auto">
                                        <div className="transform scale-110">
                                            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 p-2">
                                                <div className="bg-white rounded-2xl overflow-hidden">
                                                    {/* Mock browser bar */}
                                                    <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                                                        <div className="flex gap-1.5">
                                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                        </div>
                                                        <div className="flex-1 flex justify-center">
                                                            <div className="bg-white border border-gray-300 rounded-md px-4 py-1 text-xs text-gray-600">
                                                                reva.app/dashboard
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Dashboard content */}
                                                    <div className="flex bg-gray-50">
                                                        {/* Sidebar */}
                                                        <div className="w-48 bg-white border-r border-gray-200 p-4">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                                    </svg>
                                                                    Dashboard
                                                                </div>
                                                                <div className="text-xs font-medium text-gray-600 uppercase tracking-wider px-3 py-2 mt-3">Actions</div>
                                                                <div className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    User Flow
                                                                </div>
                                                                <div className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                    </svg>
                                                                    Content Calendar
                                                                </div>
                                                                <div className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                                    </svg>
                                                                    Quick Actions
                                                                </div>
                                                                <div className="text-xs font-medium text-gray-600 uppercase tracking-wider px-3 py-2 mt-3">Profiles</div>
                                                                <div className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                                    </svg>
                                                                    All Profiles
                                                                </div>
                                                                <div className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                                    </svg>
                                                                    Segments
                                                                </div>
                                                                <div className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                    </svg>
                                                                    Import/Exports
                                                                </div>
                                                                <div className="text-xs font-medium text-gray-600 uppercase tracking-wider px-3 py-2 mt-3">Dynamics</div>
                                                                <div className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                    </svg>
                                                                    Landing Pages
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Main content */}
                                                        <div className="flex-1 p-6">
                                                            {/* Header */}
                                                            <div className="mb-6">
                                                                <h2 className="text-xl font-bold text-gray-900 mb-1">Today's Report</h2>
                                                                <p className="text-xs text-gray-500 flex items-center gap-2">
                                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    Date range
                                                                </p>
                                                            </div>
                                                            
                                                            {/* Metrics cards */}
                                                            <div className="grid grid-cols-4 gap-3 mb-6">
                                                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className="text-xs text-gray-500">Conversions</span>
                                                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                                            <span className="text-green-600 text-xs">↗</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-xl font-bold text-gray-900">3,536</div>
                                                                    <div className="text-xs text-green-600">+18.4%</div>
                                                                </div>
                                                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className="text-xs text-gray-500">Clicked Links</span>
                                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                                            <span className="text-blue-600 text-xs">↗</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-xl font-bold text-gray-900">1,424</div>
                                                                    <div className="text-xs text-blue-600">+10.0%</div>
                                                                </div>
                                                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className="text-xs text-gray-500">Undetermined</span>
                                                                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                                                            <span className="text-yellow-600 text-xs">→</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-xl font-bold text-gray-900">153</div>
                                                                    <div className="text-xs text-yellow-600">+1.5%</div>
                                                                </div>
                                                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className="text-xs text-gray-500">Bounced</span>
                                                                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                                                            <span className="text-red-600 text-xs">↓</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-xl font-bold text-gray-900">32</div>
                                                                    <div className="text-xs text-red-600">-0.09%</div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="grid grid-cols-2 gap-4">
                                                                {/* Campaign Reports */}
                                                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                                    <div className="flex items-center justify-between mb-3">
                                                                        <h3 className="text-sm font-semibold text-gray-900">Campaign Reports</h3>
                                                                        <button className="text-xs text-gray-500 flex items-center gap-1">
                                                                            View All Campaigns
                                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                                            <div>
                                                                                <p className="text-xs font-medium text-gray-900">Unique Subscribers</p>
                                                                                <p className="text-[10px] text-gray-500">14,857</p>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <span className="text-xs text-gray-600">Now</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                                            <div>
                                                                                <p className="text-xs font-medium text-gray-900">New Email Visitors</p>
                                                                                <p className="text-[10px] text-gray-500">First-time Recipients</p>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <span className="text-xs text-gray-900 font-semibold">2,548</span>
                                                                                <span className="text-[10px] text-gray-500 ml-2">2,445</span>
                                                                                <span className="text-[10px] text-green-600 ml-1">$61,325</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                                            <div>
                                                                                <p className="text-xs font-medium text-gray-900">Email Sent to Health Profiles</p>
                                                                                <p className="text-[10px] text-gray-500">Targeted Segment</p>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <span className="text-xs text-gray-900 font-semibold">2,657</span>
                                                                                <span className="text-[10px] text-gray-500 ml-2">4,556</span>
                                                                                <span className="text-[10px] text-green-600 ml-1">$54,459</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center justify-between py-2">
                                                                            <div>
                                                                                <p className="text-xs font-medium text-gray-900">Product Focused Email</p>
                                                                                <p className="text-[10px] text-gray-500">#G34 Package - May</p>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <span className="text-xs text-gray-900 font-semibold">8,491</span>
                                                                                <span className="text-[10px] text-gray-500 ml-2">6,654</span>
                                                                                <span className="text-[10px] text-green-600 ml-1">$5,205</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                {/* Sales Report */}
                                                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                                    <div className="flex items-center justify-between mb-3">
                                                                        <h3 className="text-sm font-semibold text-gray-900">Sales Report</h3>
                                                                        <select className="text-xs text-gray-500 border-0 focus:ring-0">
                                                                            <option>May 10 - May 29</option>
                                                                        </select>
                                                                    </div>
                                                                    <div>
                                                                        <div className="flex items-center justify-between text-xs mb-1">
                                                                            <span className="text-gray-500">Total Revenue</span>
                                                                            <span className="text-gray-500">Total Orders</span>
                                                                        </div>
                                                                        <div className="flex items-center justify-between mb-3">
                                                                            <span className="text-xl font-bold text-gray-900">$131,948</span>
                                                                            <span className="text-lg font-semibold text-gray-700">3,814</span>
                                                                        </div>
                                                                        <div className="flex items-center justify-between text-xs mb-3">
                                                                            <div>
                                                                                <span className="text-gray-500">From Campaigns</span>
                                                                                <span className="text-blue-600 font-semibold ml-2">$123,386</span>
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-gray-500">Orders</span>
                                                                                <span className="text-gray-700 font-semibold ml-2">3,511</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center justify-between text-xs mb-3">
                                                                            <div>
                                                                                <span className="text-gray-500">From Direct</span>
                                                                                <span className="text-gray-700 font-semibold ml-2">$9,157</span>
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-gray-500">Orders</span>
                                                                                <span className="text-gray-700 font-semibold ml-2">403</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="h-32 flex items-end justify-between gap-1 mt-3">
                                                                            <div className="w-full bg-blue-400 rounded-t" style={{height: '55%'}}></div>
                                                                            <div className="w-full bg-blue-500 rounded-t" style={{height: '75%'}}></div>
                                                                            <div className="w-full bg-blue-400 rounded-t" style={{height: '65%'}}></div>
                                                                            <div className="w-full bg-blue-500 rounded-t" style={{height: '85%'}}></div>
                                                                            <div className="w-full bg-blue-400 rounded-t" style={{height: '70%'}}></div>
                                                                            <div className="w-full bg-blue-500 rounded-t" style={{height: '90%'}}></div>
                                                                            <div className="w-full bg-blue-400 rounded-t" style={{height: '80%'}}></div>
                                                                        </div>
                                                                        <div className="flex justify-between mt-1">
                                                                            <span className="text-[8px] text-gray-400">Monday</span>
                                                                            <span className="text-[8px] text-gray-400">Sunday</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="py-20 bg-gray-50">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Features</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need for performance-based marketing</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
                                <p className="text-gray-600">Track clicks, conversions, and engagement in real-time with our advanced analytics dashboard.</p>
                            </div>
                            
                            {/* Feature 2 */}
                            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pay For Performance</h3>
                                <p className="text-gray-600">Only pay for validated clicks and actual results. No wasted budget on fake engagement.</p>
                            </div>
                            
                            {/* Feature 3 */}
                            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fraud Protection</h3>
                                <p className="text-gray-600">Advanced bot detection and rate limiting ensure you only pay for genuine human engagement.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* How It Works Section */}
                <div id="how-it-works" className="py-20 bg-white">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get started in three simple steps</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8 relative">
                            {/* Connection lines for desktop */}
                            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transform -translate-y-1/2"></div>
                            
                            {/* Step 1 */}
                            <div className="relative text-center">
                                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 relative z-10">
                                    1
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Campaign</h3>
                                <p className="text-gray-600">Marketers set up campaigns with budget, payout rates, and targeting preferences.</p>
                            </div>
                            
                            {/* Step 2 */}
                            <div className="relative text-center">
                                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 relative z-10">
                                    2
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Share Links</h3>
                                <p className="text-gray-600">Promoters generate unique tracking links and share them across their channels.</p>
                            </div>
                            
                            {/* Step 3 */}
                            <div className="relative text-center">
                                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 relative z-10">
                                    3
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Earn Rewards</h3>
                                <p className="text-gray-600">Track performance in real-time and get paid instantly for verified engagement.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Pricing Section */}
                <div id="pricing" className="py-20 bg-gray-50">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that fits your needs</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {/* Starter Plan */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 relative">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Starter</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-gray-900">Free</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Up to 1,000 clicks/month
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Basic analytics
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        5 active campaigns
                                    </li>
                                </ul>
                                <button className="w-full py-3 px-6 text-gray-900 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition">
                                    Get Started
                                </button>
                            </div>
                            
                            {/* Pro Plan */}
                            <div className="bg-gradient-to-b from-cyan-500 to-purple-500 rounded-2xl shadow-xl p-8 relative transform scale-105">
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                    Most Popular
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-4">Pro</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-white">$99</span>
                                    <span className="text-white/80">/month</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-white">
                                        <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Unlimited clicks
                                    </li>
                                    <li className="flex items-center text-white">
                                        <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Advanced analytics
                                    </li>
                                    <li className="flex items-center text-white">
                                        <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Unlimited campaigns
                                    </li>
                                    <li className="flex items-center text-white">
                                        <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Priority support
                                    </li>
                                </ul>
                                <button className="w-full py-3 px-6 text-gray-900 bg-white rounded-lg font-semibold hover:bg-gray-100 transition">
                                    Start Free Trial
                                </button>
                            </div>
                            
                            {/* Enterprise Plan */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 relative">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-gray-900">Custom</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Everything in Pro
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Custom integrations
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Dedicated account manager
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        SLA guarantee
                                    </li>
                                </ul>
                                <button className="w-full py-3 px-6 text-gray-900 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
