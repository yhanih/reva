import React from "react";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import Widget from "components/widget/Widget";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import CheckTable from "views/admin/default/components/CheckTable";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css"; // Assuming you might want custom styles, or we can use default

const MarketerDashboard = () => {
    return (
        <div>
            {/* Card widget */}
            <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                <Widget
                    icon={<MdBarChart className="h-7 w-7" />}
                    title={"Spend This Month"}
                    subtitle={"$2,400"}
                />
                <Widget
                    icon={<IoDocuments className="h-6 w-6" />}
                    title={"Remaining Budget"}
                    subtitle={"$600"}
                />
                <Widget
                    icon={<MdBarChart className="h-7 w-7" />}
                    title={"Total Valid Clicks"}
                    subtitle={"4,800"}
                />
                <Widget
                    icon={<MdDashboard className="h-6 w-6" />}
                    title={"Avg. CPC"}
                    subtitle={"$0.50"}
                />
                <Widget
                    icon={<MdBarChart className="h-7 w-7" />}
                    title={"Active Campaigns"}
                    subtitle={"3"}
                />
                <Widget
                    icon={<IoMdHome className="h-6 w-6" />}
                    title={"Unique Visitors"}
                    subtitle={"3,900"}
                />
            </div>

            {/* Charts */}
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <TotalSpent />
                <WeeklyRevenue />
            </div>

            {/* Tables & Calendars */}
            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                <div>
                    <CheckTable
                        columnsData={[
                            {
                                Header: "CAMPAIGN NAME",
                                accessor: "name",
                            },
                            {
                                Header: "STATUS",
                                accessor: "progress",
                            },
                            {
                                Header: "BUDGET",
                                accessor: "quantity",
                            },
                            {
                                Header: "CLICKS",
                                accessor: "date",
                            },
                        ]}
                        tableData={[
                            {
                                name: "Summer Sale 2025",
                                progress: "Active",
                                quantity: "$1000",
                                date: "1,200",
                            },
                            {
                                name: "New Product Launch",
                                progress: "Active",
                                quantity: "$2000",
                                date: "3,600",
                            },
                        ]}
                    />
                </div>

                {/* Task/Calendar Placeholder */}
                <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                    <div className="grid grid-cols-1 rounded-[20px]">
                        <div className="rounded-[20px] bg-white p-6 shadow-2xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
                            <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                                Traffic Calendar
                            </h4>
                            <div className="mt-4 flex items-center justify-center">
                                <Calendar className="w-full rounded-xl border-none bg-gray-100 p-2 text-sm shadow-none dark:bg-navy-700 dark:text-white" view="month" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketerDashboard;
