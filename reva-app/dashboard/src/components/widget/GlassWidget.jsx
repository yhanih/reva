import React from "react";
import Card from "components/card";

const GlassWidget = ({ icon, title, subtitle }) => {
    return (
        <Card extra="!flex-row flex-grow items-center rounded-[20px] bg-white/30 backdrop-blur-xl border border-white/20 shadow-lg dark:!bg-navy-800/30 dark:border-white/10">
            <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-gradient-to-br from-brandLinear to-brand-500 p-3 dark:bg-navy-700">
                    <span className="flex items-center text-white">
                        {icon}
                    </span>
                </div>
            </div>

            <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                <p className="font-dm text-sm font-medium text-gray-600 dark:text-white/70">
                    {title}
                </p>
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                    {subtitle}
                </h4>
            </div>
        </Card>
    );
};

export default GlassWidget;
