import React from "react";
import {
    MdArrowDropUp,
    MdOutlineCalendarToday,
    MdBarChart,
} from "react-icons/md";
import Card from "components/card";
import LineChart from "components/charts/LineChart";

// Mock Data for now - ideally this comes from variables/charts or API
const lineChartData = [
    {
        name: "Valid Clicks",
        data: [50, 64, 48, 66, 49, 68],
    },
    {
        name: "Total Clicks",
        data: [30, 40, 24, 46, 20, 46],
    },
];

const lineChartOptions = {
    chart: {
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            top: 13,
            left: 0,
            blur: 10,
            opacity: 0.1,
            color: "#4318FF",
        },
    },
    colors: ["#4318FF", "#39B8FF"],
    markers: {
        size: 0,
        colors: "white",
        strokeColors: "#7551FF",
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
            size: undefined,
            sizeOffset: 3,
        },
    },
    tooltip: {
        theme: "dark",
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        type: "line",
    },
    xaxis: {
        type: "numeric",
        categories: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
        labels: {
            style: {
                colors: "#A3AED0",
                fontSize: "12px",
                fontWeight: "500",
            },
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    legend: {
        show: false,
    },
    grid: {
        show: false,
        column: {
            color: ["#7551FF", "#39B8FF"],
            opacity: 0.5,
        },
    },
    color: ["#7551FF", "#39B8FF"],
};

const ClickPerformance = () => {
    return (
        <Card extra="!p-[20px] text-center">
            <div className="flex justify-between">
                <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
                    <MdOutlineCalendarToday />
                    <span className="text-sm font-medium text-gray-600">This month</span>
                </button>
                <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
                    <MdBarChart className="h-6 w-6" />
                </button>
            </div>

            <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
                <div className="flex flex-col">
                    <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
                        1,245
                    </p>
                    <div className="flex flex-col items-start">
                        <p className="mt-2 text-sm text-gray-600">Total Valid Clicks</p>
                        <div className="flex flex-row items-center justify-center">
                            <MdArrowDropUp className="font-medium text-green-500" />
                            <p className="text-sm font-bold text-green-500"> +12.5% </p>
                        </div>
                    </div>
                </div>
                <div className="h-full w-full">
                    <LineChart
                        options={lineChartOptions}
                        series={lineChartData}
                    />
                </div>
            </div>
        </Card>
    );
};

export default ClickPerformance;
