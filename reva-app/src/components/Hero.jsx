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
                            <button type="button" className="p-2 text-gray-900 rounded-lg hover:bg-gray-100 touch-target" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
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

                    {/* Mobile Full-Screen Overlay Menu */}
                    {expanded && (
                        <div className="lg:hidden fixed inset-0 z-50 bg-white">
                            <div className="h-full flex flex-col">
                                {/* Mobile Menu Header */}
                                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                                    <a href="#" title="" className="flex">
                                        <span className="text-2xl font-bold tracking-tight text-gray-900">Reva</span>
                                    </a>
                                    <button 
                                        type="button" 
                                        className="p-2 text-gray-900 rounded-lg hover:bg-gray-100 touch-target" 
                                        onClick={() => setExpanded(false)}
                                    >
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                {/* Mobile Menu Content */}
                                <nav className="flex-1 overflow-y-auto">
                                    <div className="px-4 py-6">
                                        <div className="space-y-1">
                                            <a 
                                                href="#features" 
                                                onClick={() => setExpanded(false)}
                                                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                                            >
                                                Features
                                            </a>
                                            <a 
                                                href="#how-it-works" 
                                                onClick={() => setExpanded(false)}
                                                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                                            >
                                                How It Works
                                            </a>
                                            <a 
                                                href="#pricing" 
                                                onClick={() => setExpanded(false)}
                                                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                                            >
                                                Pricing
                                            </a>
                                        </div>
                                        
                                        <div className="pt-6 mt-6 border-t border-gray-100">
                                            <a 
                                                href="#" 
                                                onClick={() => setExpanded(false)}
                                                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                                            >
                                                Login
                                            </a>
                                            <div className="mt-4 px-4">
                                                <a
                                                    href="#"
                                                    onClick={() => setExpanded(false)}
                                                    className="flex items-center justify-center w-full px-6 py-3 text-base font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-700 transition-all duration-200"
                                                >
                                                    Get Started
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
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
                    {/* Clean overlay for consistency */}
                    <div className="absolute inset-0 pointer-events-none z-10"></div>
                    
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
                                    {/* Clean glow effect */}
                                    <span className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 scale-110"></span>
                                    <span className="relative text-cyan-600 font-bold"> {currentContent.highlight}</span>
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
                                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base font-semibold text-white transition-all duration-300 rounded-lg btn-touch btn-touch-mobile bg-cyan-600 hover:bg-cyan-700 transform hover:scale-[1.02] hover:shadow-lg"
                            >
                                <span className="relative z-10">{currentContent.cta}</span>
                            </Link>
                            
                            <Link
                                to="/login"
                                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-lg btn-touch btn-touch-mobile transition-all duration-300 hover:border-gray-300 hover:shadow-md transform hover:scale-[1.02]"
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
                                <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
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
                                <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="lg:max-w-6xl lg:mx-auto">
                                        <div className="transform scale-75 sm:scale-90 md:scale-100 lg:scale-110">
                                            <div className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200 p-1 sm:p-2">
                                                <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden">
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
                                                        <div className="hidden md:block w-32 lg:w-48 bg-white border-r border-gray-200 p-2 lg:p-4">
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
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6">
                                                                <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200">
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className="text-xs text-gray-500">Conversions</span>
                                                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                                            <span className="text-green-600 text-xs">↗</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-xl font-bold text-gray-900">3,536</div>
                                                                    <div className="text-xs text-green-600">+18.4%</div>
                                                                </div>
                                                                <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200">
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className="text-xs text-gray-500">Clicked Links</span>
                                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                                            <span className="text-blue-600 text-xs">↗</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-xl font-bold text-gray-900">1,424</div>
                                                                    <div className="text-xs text-blue-600">+10.0%</div>
                                                                </div>
                                                                <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200">
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className="text-xs text-gray-500">Undetermined</span>
                                                                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                                                            <span className="text-yellow-600 text-xs">→</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-xl font-bold text-gray-900">153</div>
                                                                    <div className="text-xs text-yellow-600">+1.5%</div>
                                                                </div>
                                                                <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200">
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
                                                            
                                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                                                                {/* Campaign Reports */}
                                                                <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
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
                                                                <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
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
                <section id="features" className="py-16 bg-gray-50 sm:py-20 lg:py-24">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">Make every step user-centric</h2>
                            <p className="mt-4 text-lg text-gray-600">Powerful features designed for performance marketing success</p>
                        </div>

                        <div className="grid grid-cols-1 mt-12 sm:mt-16 lg:mt-20 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Support Card */}
                            <div className="group relative bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-cyan-200 transition-all duration-200">
                                <div className="flex items-center justify-center w-14 h-14 mx-auto bg-cyan-50 rounded-xl group-hover:bg-cyan-100 transition-colors duration-200">
                                    <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-lg font-semibold text-gray-900">Support</h3>
                                <p className="mt-3 text-sm leading-relaxed text-gray-600">24/7 dedicated support team to help you maximize campaign performance and resolve issues quickly.</p>
                            </div>

                            {/* Sales Card */}
                            <div className="group relative bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-cyan-200 transition-all duration-200">
                                <div className="flex items-center justify-center w-14 h-14 mx-auto bg-cyan-50 rounded-xl group-hover:bg-cyan-100 transition-colors duration-200">
                                    <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-lg font-semibold text-gray-900">Sales</h3>
                                <p className="mt-3 text-sm leading-relaxed text-gray-600">Track sales conversions in real-time with detailed analytics and performance metrics.</p>
                            </div>
                            
                            {/* Onboarding Card */}
                            <div className="group relative bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-cyan-200 transition-all duration-200">
                                <div className="flex items-center justify-center w-14 h-14 mx-auto bg-cyan-50 rounded-xl group-hover:bg-cyan-100 transition-colors duration-200">
                                    <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-lg font-semibold text-gray-900">Onboarding</h3>
                                <p className="mt-3 text-sm leading-relaxed text-gray-600">Seamless onboarding process gets you up and running in minutes with guided setup.</p>
                            </div>
                            
                            {/* Product Card */}
                            <div className="group relative bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-cyan-200 transition-all duration-200">
                                <div className="flex items-center justify-center w-14 h-14 mx-auto bg-cyan-50 rounded-xl group-hover:bg-cyan-100 transition-colors duration-200">
                                    <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-lg font-semibold text-gray-900">Product</h3>
                                <p className="mt-3 text-sm leading-relaxed text-gray-600">Comprehensive product management tools to organize and optimize your campaigns.</p>
                            </div>
                            
                            {/* Quality Card */}
                            <div className="group relative bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-cyan-200 transition-all duration-200">
                                <div className="flex items-center justify-center w-14 h-14 mx-auto bg-cyan-50 rounded-xl group-hover:bg-cyan-100 transition-colors duration-200">
                                    <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-lg font-semibold text-gray-900">Quality</h3>
                                <p className="mt-3 text-sm leading-relaxed text-gray-600">Advanced fraud detection ensures high-quality traffic and genuine engagement only.</p>
                            </div>
                            
                            {/* Result Card */}
                            <div className="group relative bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-cyan-200 transition-all duration-200">
                                <div className="flex items-center justify-center w-14 h-14 mx-auto bg-cyan-50 rounded-xl group-hover:bg-cyan-100 transition-colors duration-200">
                                    <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                    </svg>
                                </div>
                                <h3 className="mt-6 text-lg font-semibold text-gray-900">Result</h3>
                                <p className="mt-3 text-sm leading-relaxed text-gray-600">Detailed reporting and analytics to measure ROI and optimize campaign performance.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* How It Works Section */}
                <section id="how-it-works" className="py-10 bg-white sm:py-16 lg:py-24">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-fluid-lg font-bold leading-tight text-black">How does it work?</h2>
                            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
                        </div>

                        <div className="relative mt-12 lg:mt-20">
                            <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                                <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
                            </div>

                            <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                                <div>
                                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                        <span className="text-xl font-semibold text-gray-700"> 1 </span>
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Create a free account</h3>
                                    <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                        <span className="text-xl font-semibold text-gray-700"> 2 </span>
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Build your website</h3>
                                    <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                        <span className="text-xl font-semibold text-gray-700"> 3 </span>
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Release & Launch</h3>
                                    <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Pricing Section */}
                <section id="pricing" className="py-10 bg-white sm:py-16 lg:py-24">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="max-w-xl mx-auto text-center">
                            <h2 className="text-fluid-lg font-bold text-black">Pricing & Plans</h2>
                            <p className="mt-4 text-lg leading-relaxed text-gray-600">Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                        </div>

                        {/* Desktop View - Table */}
                        <div className="hidden mt-16 md:block overflow-x-auto">
                            <table className="w-full min-w-[640px]">
                                <thead>
                                    <tr>
                                        <th className="py-8 pr-4"></th>

                                        <th className="px-4 py-8 text-center">
                                            <span className="text-base font-medium text-cyan-600"> Free </span>
                                            <p className="mt-6 text-6xl font-bold">$0</p>
                                            <p className="mt-2 text-base font-normal text-gray-500">Per month</p>
                                        </th>

                                        <th className="px-4 py-8 text-center">
                                            <span className="text-base font-medium text-cyan-600"> Team </span>
                                            <p className="mt-6 text-6xl font-bold">$99</p>
                                            <p className="mt-2 text-base font-normal text-gray-500">Per month</p>
                                        </th>

                                        <th className="px-4 py-8 text-center bg-gray-900 rounded-t-xl">
                                            <span className="px-4 py-2 text-base font-medium text-white bg-cyan-600 rounded-full"> Popular </span>
                                            <p className="mt-6 text-6xl font-bold text-white">$150</p>
                                            <p className="mt-2 text-base font-normal text-gray-200">Per month</p>
                                        </th>

                                        <th className="px-4 py-8 text-center">
                                            <span className="text-base font-medium text-cyan-600"> Enterprise </span>
                                            <p className="mt-6 text-6xl font-bold">$490</p>
                                            <p className="mt-2 text-base font-normal text-gray-500">Per month</p>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className="py-4 pr-4 font-medium border-b border-gray-200">Website number</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">01</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">10</td>
                                        <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">50</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">Unlimited</td>
                                    </tr>

                                    <tr>
                                        <td className="py-4 pr-4 font-medium border-b border-gray-200">Server storage</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">100 GB</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">500 GB</td>
                                        <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">1 TB</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">Unlimited</td>
                                    </tr>

                                    <tr>
                                        <td className="py-4 pr-4 font-medium border-b border-gray-200">Database</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">-</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">15</td>
                                        <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">Unlimited</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">Unlimited</td>
                                    </tr>

                                    <tr>
                                        <td className="py-4 pr-4 font-medium border-b border-gray-200">Unmetered Bandwidth</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">-</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">
                                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </td>
                                        <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">
                                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-4 pr-4 font-medium border-b border-gray-200">SSD Disk</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">-</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">-</td>
                                        <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">
                                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-4 pr-4 font-medium border-b border-gray-200">VCPUS Fontworld</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">-</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">-</td>
                                        <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">
                                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-4 pr-4 font-medium border-b border-gray-200">WordPress install</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">-</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">-</td>
                                        <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">
                                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-4 pr-4 font-medium border-b border-gray-200">Server speed</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">-</td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">-</td>
                                        <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </td>
                                        <td className="px-4 py-4 text-center border-b border-gray-200">
                                            <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-6 pr-4"></td>
                                        <td className="px-4 py-6 text-center">
                                            <a href="#" title="" className="inline-flex items-center font-semibold text-cyan-600 hover:text-cyan-700">
                                                Get Started
                                                <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                </svg>
                                            </a>
                                        </td>
                                        <td className="px-4 py-6 text-center">
                                            <a href="#" title="" className="inline-flex items-center font-semibold text-cyan-600 hover:text-cyan-700">
                                                Get Started
                                                <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                </svg>
                                            </a>
                                        </td>
                                        <td className="px-4 py-6 text-center text-white bg-cyan-600 rounded-b-xl">
                                            <a href="#" title="" className="inline-flex items-center font-semibold text-white hover:underline">
                                                Get Started
                                                <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                </svg>
                                            </a>
                                        </td>
                                        <td className="px-4 py-6 text-center">
                                            <a href="#" title="" className="inline-flex items-center font-semibold text-cyan-600 hover:text-cyan-700">
                                                Get Started
                                                <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View */}
                        <div className="block mt-12 border-t border-b border-gray-200 divide-y divide-gray-200 md:hidden">
                            <div className="grid grid-cols-2 sm:grid-cols-4 text-center divide-x divide-gray-200">
                                <div className="px-2 py-2">
                                    <span className="text-sm font-medium text-cyan-600"> Free </span>
                                    <p className="mt-2 text-xl font-bold">$0</p>
                                    <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                                </div>

                                <div className="px-2 py-2">
                                    <span className="text-sm font-medium text-cyan-600"> Team </span>
                                    <p className="mt-2 text-xl font-bold">$99</p>
                                    <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                                </div>

                                <div className="px-2 py-2">
                                    <span className="text-sm font-medium text-cyan-600"> Popular </span>
                                    <p className="mt-2 text-xl font-bold">$150</p>
                                    <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                                </div>

                                <div className="px-2 py-2">
                                    <span className="text-sm font-medium text-cyan-600"> Enterprise </span>
                                    <p className="mt-2 text-xl font-bold">$490</p>
                                    <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                                </div>
                            </div>

                            <div className="px-2 py-4 sm:px-4">
                                <p className="font-semibold">Website number</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 text-center divide-x divide-gray-200">
                                <div className="px-2 py-2">01</div>
                                <div className="px-2 py-2">10</div>
                                <div className="px-2 py-2">50</div>
                                <div className="px-2 py-2">Unlimited</div>
                            </div>

                            <div className="px-2 py-4 sm:px-4">
                                <p className="font-semibold">Server storage</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 text-center divide-x divide-gray-200">
                                <div className="px-2 py-2">100 GB</div>
                                <div className="px-2 py-2">500 GB</div>
                                <div className="px-2 py-2">1 TB</div>
                                <div className="px-2 py-2">Unlimited</div>
                            </div>

                            <div className="px-2 py-4 sm:px-4">
                                <p className="font-semibold">Database</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 text-center divide-x divide-gray-200">
                                <div className="px-2 py-2">-</div>
                                <div className="px-2 py-2">15</div>
                                <div className="px-2 py-2">Unlimited</div>
                                <div className="px-2 py-2">Unlimited</div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 text-center divide-x divide-gray-200">
                                <div className="px-1 py-2 sm:px-4">
                                    <span className="text-sm font-medium text-cyan-600"> Free </span>
                                    <p className="mt-2 text-xl font-bold">$0</p>
                                    <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                                    <a href="#" title="" className="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-cyan-600 border border-transparent rounded-md hover:bg-cyan-700" role="button"> Get Started </a>
                                </div>

                                <div className="px-1 py-2 sm:px-4">
                                    <span className="text-sm font-medium text-cyan-600"> Team </span>
                                    <p className="mt-2 text-xl font-bold">$99</p>
                                    <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                                    <a href="#" title="" className="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-cyan-600 border border-transparent rounded-md hover:bg-cyan-700" role="button"> Get Started </a>
                                </div>

                                <div className="px-1 py-2 sm:px-4">
                                    <span className="text-sm font-medium text-cyan-600"> Popular </span>
                                    <p className="mt-2 text-xl font-bold">$150</p>
                                    <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                                    <a href="#" title="" className="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-cyan-600 border border-transparent rounded-md hover:bg-cyan-700" role="button"> Get Started </a>
                                </div>

                                <div className="px-1 pt-2 pb-4 sm:px-4">
                                    <span className="text-sm font-medium text-cyan-600"> Enterprise </span>
                                    <p className="mt-2 text-xl font-bold">$490</p>
                                    <span className="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                                    <a href="#" title="" className="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-cyan-600 border border-transparent rounded-md hover:bg-cyan-700" role="button"> Get Started </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="bg-white border-t border-gray-100">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                            {/* Logo and Description */}
                            <div className="md:col-span-1">
                                <a href="#" className="inline-block">
                                    <span className="text-2xl font-bold text-gray-900">Reva</span>
                                </a>
                                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                                    Connect marketers with promoters through performance-based campaigns. Track, verify, and reward real engagement.
                                </p>
                                
                                {/* Social Media Icons */}
                                <div className="flex items-center gap-3 mt-6">
                                    <a href="#" className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-gray-50 rounded-full w-10 h-10 hover:bg-cyan-100 hover:text-cyan-600">
                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.491 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.636 8.645 8.645 0 0 1-2.019 2.083z"
                                                ></path>
                                            </svg>
                                    </a>
                                    <a href="#" className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-gray-50 rounded-full w-10 h-10 hover:bg-cyan-100 hover:text-cyan-600">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                                        </svg>
                                    </a>
                                    <a href="#" className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-gray-50 rounded-full w-10 h-10 hover:bg-cyan-100 hover:text-cyan-600">
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                                            <circle cx="16.806" cy="7.207" r="1.078"></circle>
                                            <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                                        </svg>
                                    </a>
                                    <a href="#" className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-gray-50 rounded-full w-10 h-10 hover:bg-cyan-100 hover:text-cyan-600">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Company Links */}
                            <div>
                                <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Company</h3>
                                <ul className="mt-4 space-y-3">
                                    <li>
                                        <a href="#" className="text-sm text-gray-600 transition-colors duration-200 hover:text-cyan-600">About</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm text-gray-600 transition-colors duration-200 hover:text-cyan-600">Features</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm text-gray-600 transition-colors duration-200 hover:text-cyan-600">Works</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm text-gray-600 transition-colors duration-200 hover:text-cyan-600">Career</a>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Help Links */}
                            <div>
                                <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Help</h3>
                                <ul className="mt-4 space-y-3">
                                    <li>
                                        <a href="#" className="text-sm text-gray-600 transition-colors duration-200 hover:text-cyan-600">Customer Support</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm text-gray-600 transition-colors duration-200 hover:text-cyan-600">Delivery Details</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm text-gray-600 transition-colors duration-200 hover:text-cyan-600">Terms & Conditions</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm text-gray-600 transition-colors duration-200 hover:text-cyan-600">Privacy Policy</a>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Newsletter Subscription */}
                            <div>
                                <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Subscribe to Newsletter</h3>
                                <form className="mt-4 space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors duration-200"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3 text-sm font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>

                        
                        {/* Copyright Section */}
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <p className="text-xs text-center text-gray-500">© 2025 Reva. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Hero;
