import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
    const [expanded, setExpanded] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="overflow-x-hidden bg-gray-50">
            <header className={`py-4 md:py-6 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
                <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                                <span className="text-3xl font-bold text-gray-900">Reva</span>
                            </Link>
                        </div>

                        <div className="flex lg:hidden">
                            <button 
                                type="button" 
                                className="text-gray-900" 
                                onClick={() => setExpanded(!expanded)} 
                                aria-expanded={expanded}
                                aria-label="Toggle navigation menu"
                            >
                                {!expanded ? (
                                    <span aria-hidden="true">
                                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </span>
                                ) : (
                                    <span aria-hidden="true">
                                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </div>

                        <nav className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10 xl:space-x-16">
                            <a href="#features" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-indigo-600 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Features</a>
                            <a href="#how-it-works" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-indigo-600 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">How It Works</a>
                            <a href="#pricing" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-indigo-600 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Pricing</a>
                        </nav>

                        <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-6">
                            <Link 
                                to="/login" 
                                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-medium text-gray-900 transition-all duration-200 border-2 border-gray-300 rounded-xl hover:border-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gradient-to-r from-indigo-600 to-purple-600 border border-transparent rounded-xl hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {expanded && (
                        <nav className="lg:hidden">
                            <div className="px-1 py-8">
                                <div className="grid gap-y-7">
                                    <a href="#features" className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Features</a>
                                    <a href="#how-it-works" className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">How It Works</a>
                                    <a href="#pricing" className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Pricing</a>
                                    <Link to="/login" className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Login</Link>

                                    <Link
                                        to="/signup"
                                        className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gradient-to-r from-indigo-600 to-purple-600 border border-transparent rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    )}
                </div>
            </header>

            <section className="pt-12 bg-gray-50 sm:pt-16 lg:pt-20">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Performance Marketing Platform
                        </div>

                        <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl sm:leading-tight lg:leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>
                            Turn everyday links into powerful
                            <span className="relative inline-flex sm:inline ml-3">
                                <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-xl filter opacity-40 w-full h-full absolute inset-0"></span>
                                <span className="relative bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> growth engines </span>
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-gray-600 sm:text-xl" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                            Connect marketers with promoters. Reward authentic engagement. Build trust between people and brands.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row sm:gap-5">
                            <button
                                onClick={() => navigate('/signup')}
                                className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-indigo-600 to-purple-600 border-2 border-transparent sm:w-auto rounded-xl hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:shadow-indigo-500/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                            >
                                Join as Marketer
                            </button>

                            <button
                                onClick={() => navigate('/signup')}
                                className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-gray-900 transition-all duration-200 bg-white border-2 border-gray-300 sm:w-auto rounded-xl hover:border-indigo-600 hover:text-indigo-600 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                            >
                                Join as Promoter
                            </button>
                        </div>

                        <p className="mt-10 text-base font-medium text-gray-600">
                            <span className="inline-flex items-center">
                                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Reward authentic engagement
                            </span>
                            <span className="mx-3 text-gray-400">·</span>
                            <span className="inline-flex items-center">
                                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Build trust with your audience
                            </span>
                        </p>
                    </div>
                </div>

                <div className="mt-16 pb-12 bg-white sm:mt-20">
                    <div className="relative">
                        <div className="absolute inset-0 h-2/3 bg-gray-50"></div>
                        <div className="relative mx-auto">
                            <div className="lg:max-w-6xl lg:mx-auto px-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-50"></div>
                                    <img 
                                        className="relative transform scale-100 sm:scale-110 rounded-lg shadow-2xl" 
                                        src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/2/illustration.png" 
                                        alt="Reva dashboard showing campaign metrics and analytics in a clean interface"
                                    />
                                </div>
                                <p className="mt-6 text-center text-sm font-medium text-gray-600">
                                    All your campaign metrics and promoter analytics in one clean dashboard
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;