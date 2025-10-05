import React from 'react';

const LinkVisualization = () => {
    return (
        <section className="relative py-24 bg-gradient-to-b from-[#0B1020] to-[#1a1f3a] overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#36E0FF] rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        The Link <span className="bg-gradient-to-r from-[#36E0FF] to-[#FF7A6A] bg-clip-text text-transparent">Lifecycle</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Watch how a simple link transforms into a powerful growth engine
                    </p>
                </div>

                <div className="relative">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#36E0FF] to-blue-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition duration-500"></div>
                            <div className="relative bg-white/5 backdrop-blur-xl border border-[#36E0FF]/30 rounded-2xl p-8 hover:border-[#36E0FF] transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#36E0FF] to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#36E0FF]/50">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Marketer Creates</h3>
                                <p className="text-gray-400">Set up campaign, budget, and rewards</p>
                                <div className="mt-4 flex items-center space-x-2">
                                    <div className="flex-1 h-1 bg-gradient-to-r from-[#36E0FF] to-blue-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-[#36E0FF] rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center">
                            <div className="w-16 h-0.5 bg-gradient-to-r from-[#36E0FF] via-purple-500 to-[#FF7A6A] relative">
                                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 bg-[#FF7A6A] rounded-full animate-ping"></div>
                            </div>
                            <svg className="w-6 h-6 text-[#FF7A6A]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition duration-500"></div>
                            <div className="relative bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 hover:border-purple-500 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Promoter Shares</h3>
                                <p className="text-gray-400">Generate unique tracking link</p>
                                <div className="mt-4 flex items-center space-x-2">
                                    <div className="flex-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center">
                            <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 via-orange-500 to-[#FF7A6A] relative">
                                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 bg-[#FF7A6A] rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                            </div>
                            <svg className="w-6 h-6 text-[#FF7A6A]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF7A6A] to-orange-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition duration-500"></div>
                            <div className="relative bg-white/5 backdrop-blur-xl border border-[#FF7A6A]/30 rounded-2xl p-8 hover:border-[#FF7A6A] transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#FF7A6A] to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#FF7A6A]/50">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Everyone Earns</h3>
                                <p className="text-gray-400">Authentic clicks = rewards</p>
                                <div className="mt-4 flex items-center space-x-2">
                                    <div className="flex-1 h-1 bg-gradient-to-r from-[#FF7A6A] to-orange-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-[#FF7A6A] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-6 py-3">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span className="text-green-400 font-medium">Fraud detection built-in at every step</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LinkVisualization;