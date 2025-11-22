import React from "react";
import Card from "components/card";
import Checkbox from "components/checkbox";
import { MdDragIndicator, MdCheckCircle } from "react-icons/md";

const PromoterTasks = () => {
    return (
        <Card extra="pb-7 p-[20px]">
            {/* task header */}
            <div className="relative flex flex-row justify-between">
                <div className="flex items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
                        <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
                    </div>
                    <h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">
                        Tasks
                    </h4>
                </div>
                <button aria-label="Drag Tasks" className="flex items-center text-xl hover:cursor-pointer bg-lightPrimary p-2 rounded-lg text-brand-500 transition duration-200 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
                    <MdDragIndicator className="w-6 h-6" />
                </button>
            </div>

            {/* task content */}
            <div className="h-full w-full">
                <div className="mt-5 flex items-center justify-between p-2">
                    <div className="flex items-center justify-center gap-2">
                        <Checkbox />
                        <p className="text-base font-bold text-navy-700 dark:text-white">
                            Promote new link
                        </p>
                    </div>
                    <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white cursor-pointer" />
                </div>

                <div className="mt-2 flex items-center justify-between p-2">
                    <div className="flex items-center justify-center gap-2">
                        <Checkbox />
                        <p className="text-base font-bold text-navy-700 dark:text-white">
                            Share campaign on Twitter
                        </p>
                    </div>
                    <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white cursor-pointer" />
                </div>

                <div className="mt-2 flex items-center justify-between p-2">
                    <div className="flex items-center justify-center gap-2">
                        <Checkbox defaultChecked />
                        <p className="text-base font-bold text-navy-700 dark:text-white">
                            Check daily performance
                        </p>
                    </div>
                    <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white cursor-pointer" />
                </div>

                <div className="mt-2 flex items-center justify-between p-2">
                    <div className="flex items-center justify-center gap-2">
                        <Checkbox />
                        <p className="text-base font-bold text-navy-700 dark:text-white">
                            Withdraw earnings
                        </p>
                    </div>
                    <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white cursor-pointer" />
                </div>
            </div>
        </Card>
    );
};

export default PromoterTasks;
