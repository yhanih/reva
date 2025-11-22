import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/SignUp";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdAttachMoney,
  MdLink,
  MdGroup,
  MdSettings
} from "react-icons/md";

// Common Routes (Auth, etc.)
const commonRoutes = [
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
    hidden: true,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignUp />,
    hidden: true,
  },
];

// Marketer Routes (Client-style)
export const marketerRoutes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Create Campaign",
    layout: "/admin",
    path: "create-campaign",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <MainDashboard />, // Placeholder
  },
  {
    name: "My Campaigns",
    layout: "/admin",
    path: "my-campaigns",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <DataTables />, // Placeholder
  },
  {
    name: "Spend & Billing",
    layout: "/admin",
    path: "billing",
    icon: <MdAttachMoney className="h-6 w-6" />,
    component: <DataTables />, // Placeholder
  },
  {
    name: "Traffic Analytics",
    layout: "/admin",
    path: "analytics",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <DataTables />, // Placeholder
  },
  {
    name: "Team",
    layout: "/admin",
    path: "team",
    icon: <MdGroup className="h-6 w-6" />,
    component: <Profile />, // Placeholder
  },
  {
    name: "Profile Settings",
    layout: "/admin",
    path: "profile",
    icon: <MdSettings className="h-6 w-6" />,
    component: <Profile />,
  },
  ...commonRoutes,
];

// Promoter Routes (Freelancer-style)
export const promoterRoutes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Campaign Marketplace",
    layout: "/admin",
    path: "marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
  },
  {
    name: "My Links",
    layout: "/admin",
    path: "my-links",
    icon: <MdLink className="h-6 w-6" />,
    component: <DataTables />, // Placeholder
  },
  {
    name: "Earnings",
    layout: "/admin",
    path: "earnings",
    icon: <MdAttachMoney className="h-6 w-6" />,
    component: <DataTables />, // Placeholder
  },
  {
    name: "Leaderboard",
    layout: "/admin",
    path: "leaderboard",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <DataTables />, // Placeholder
  },
  {
    name: "Profile Settings",
    layout: "/admin",
    path: "profile",
    icon: <MdSettings className="h-6 w-6" />,
    component: <Profile />,
  },
  ...commonRoutes,
];

const routes = [...marketerRoutes]; // Default export for backward compatibility
export default routes;
