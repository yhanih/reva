import React from "react";
import Card from "components/card";

const PayoutGoal = () => {
    return (
        <Card extra="!p-[20px] text-center bg-gradient-to-br from-[#868CFF] to-[#4318FF] text-white">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-white">Next Payout Goal</h4>
                <div className="p-2 bg-white/20 rounded-full">
                    <span className="text-xs font-bold">🏆 Level 3</span>
                </div>
            </div>

            <div className="relative flex items-center justify-center">
                {/* Circular Progress Placeholder - CSS based for simplicity */}
                <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                            className="text-white/20 stroke-current"
                            strokeWidth="10"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                        ></circle>
                        <circle
                            className="text-white progress-ring__circle stroke-current"
                            strokeWidth="10"
                            strokeLinecap="round"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            strokeDasharray="251.2"
                            strokeDashoffset="62.8" // 75% progress
                            transform="rotate(-90 50 50)"
                        ></circle>
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">$750</span>
                        <span className="text-xs text-white/80">of $1,000</span>
                    </div>
                </div>
            </div>

            <p className="mt-4 text-sm text-white/90">
                You're 75% of the way to your next payout bonus! Keep pushing! 🚀
            </p>
        </Card>
    );
};

export default PayoutGoal;
