import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="overflow-x-hidden bg-gray-50">
            <header className="py-4 md:py-6">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link 
                                to="/" 
                                className="flex rounded outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                            >
                                <span className="text-3xl font-bold text-gray-900">Reva</span>
                            </Link>
                        </div>

                        <div className="flex lg:hidden">
                            <button 
                                type="button" 
                                className="text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 rounded" 
                                onClick={() => setExpanded(!expanded)} 
                                aria-expanded={expanded}
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

                        <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10 xl:space-x-12">
                            <a 
                                href="#how-it-works" 
                                className="text-base font-medium text-gray-700 transition-all duration-200 rounded focus:outline-none hover:text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                            >
                                How It Works
                            </a>
                            <a 
                                href="#for-marketers" 
                                className="text-base font-medium text-gray-700 transition-all duration-200 rounded focus:outline-none hover:text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                            >
                                For Marketers
                            </a>
                            <a 
                                href="#for-promoters" 
                                className="text-base font-medium text-gray-700 transition-all duration-200 rounded focus:outline-none hover:text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                            >
                                For Promoters
                            </a>
                        </div>

                        <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-8">
                            <Link 
                                to="/login" 
                                className="text-base font-medium text-gray-700 transition-all duration-200 rounded focus:outline-none hover:text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white transition-all duration-200 bg-gradient-to-r from-indigo-500 to-cyan-400 border border-transparent rounded-lg hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {expanded && (
                        <nav className="lg:hidden">
                            <div className="px-1 py-8">
                                <div className="grid gap-y-6">
                                    <a 
                                        href="#how-it-works" 
                                        className="flex items-center p-3 -m-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                                    >
                                        How It Works
                                    </a>
                                    <a 
                                        href="#for-marketers" 
                                        className="flex items-center p-3 -m-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                                    >
                                        For Marketers
                                    </a>
                                    <a 
                                        href="#for-promoters" 
                                        className="flex items-center p-3 -m-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                                    >
                                        For Promoters
                                    </a>
                                    <Link 
                                        to="/login" 
                                        className="flex items-center p-3 -m-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white transition-all duration-200 bg-gradient-to-r from-indigo-500 to-cyan-400 border border-transparent rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    )}
                </div>
            </header>

            <section className="pt-20 md:pt-28 pb-12 bg-gray-50">
                <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center px-4 py-2 mb-6 text-xs font-medium tracking-wider text-indigo-700 uppercase bg-indigo-50 rounded-full">
                            Performance marketing, made honest
                        </div>
                        
                        <h1 
                            className="text-gray-900 font-bold leading-tight mb-6"
                            style={{ fontSize: 'clamp(28px, 6vw, 56px)', maxWidth: '24ch', margin: '0 auto 1.5rem' }}
                        >
                            Pay only for verified clicks
                        </h1>
                        
                        <p 
                            className="text-gray-600 leading-relaxed mb-10"
                            style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', maxWidth: '65ch', margin: '0 auto 2.5rem' }}
                        >
                            Reva connects marketers with promoters and validates every click, so budgets go to real people, not bots.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                            <Link
                                to="/signup"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-gradient-to-r from-indigo-500 to-cyan-400 border border-transparent rounded-lg hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                            >
                                Get started
                            </Link>
                        </div>

                        <p className="text-sm text-gray-500">
                            Trusted by 1,200+ campaigns • $3.2M paid out
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
