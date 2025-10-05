import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pattern from './Pattern';

const Hero = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="overflow-x-hidden bg-white relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Pattern />
            </div>
            <header className="py-4 md:py-6 relative z-10">
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

            <section className="pt-12 bg-white sm:pt-16 relative z-10">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="px-6 text-lg font-medium text-gray-600 tracking-wide">Performance marketing platform connecting marketers and promoters</h1>
                        <p className="mt-6 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight tracking-tight">
                            Turn your visitors into profitable
                            <span className="relative inline-flex sm:inline">
                                <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                                <span className="relative"> business </span>
                            </span>
                        </p>

                        <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-10">
                            <a
                                href="#"
                                title=""
                                className="inline-flex items-center justify-center w-full px-8 py-3.5 text-lg font-semibold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                role="button"
                            >
                                Join as Marketer
                            </a>

                            <a
                                href="#"
                                title=""
                                className="inline-flex items-center justify-center w-full px-8 py-3.5 mt-4 text-lg font-semibold text-gray-900 transition-all duration-200 bg-white border-2 border-gray-300 sm:w-auto sm:mt-0 rounded-xl hover:border-gray-900 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                role="button"
                            >
                                Join as Promoter
                            </a>
                        </div>

                        <p className="mt-9 text-base text-gray-500 font-medium">Track authentic engagement · Reward real results</p>
                    </div>
                </div>

                <div className="pb-12 bg-white">
                    <div className="relative">
                        <div className="absolute inset-0 h-2/3 bg-white"></div>
                        <div className="relative mx-auto">
                            <div className="lg:max-w-6xl lg:mx-auto">
                                <img className="transform scale-110" src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/2/illustration.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
