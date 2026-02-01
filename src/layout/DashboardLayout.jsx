import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuUser,
  LuChefHat,
  LuShoppingCart,
  LuMessageSquare,
  LuHeart,
  LuMenu,
  LuX,
} from "react-icons/lu";

const DashboardLayout = ({ role = "user" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navData, setNavData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch("/nav.json")
      .then((res) => res.json())
      .then((data) => setNavData(data));
  }, []);

  const iconMap = {
    LuUser,
    LuChefHat,
    LuShoppingCart,
    LuMessageSquare,
    LuHeart,
  };

  const userNav = [
    { label: "Profile", path: "/dashboard/profile", icon: LuUser },
    { label: "My Orders", path: "/dashboard/my-orders", icon: LuShoppingCart },
    {
      label: "My Reviews",
      path: "/dashboard/my-reviews",
      icon: LuMessageSquare,
    },
    { label: "Favorites", path: "/dashboard/favorites", icon: LuHeart },
  ];

  const chefNav = [
    { label: "Profile", path: "/dashboard/profile", icon: LuUser },
    { label: "Create Meal", path: "/dashboard/create-meal", icon: LuChefHat },
    { label: "My Meals", path: "/dashboard/my-meals", icon: LuShoppingCart },
    {
      label: "Order Requests",
      path: "/dashboard/order-requests",
      icon: LuMessageSquare,
    },
  ];

  const adminNav = [
    { label: "Profile", path: "/dashboard/profile", icon: LuUser },
    { label: "Manage Users", path: "/dashboard/manage-users", icon: LuChefHat },
    {
      label: "Manage Requests",
      path: "/dashboard/manage-requests",
      icon: LuMessageSquare,
    },
    { label: "Statistics", path: "/dashboard/statistics", icon: LuHeart },
  ];

  const navItems = navData
    ? navData[role + "Nav"].map((item) => ({
        ...item,
        icon: iconMap[item.icon],
      }))
    : role === "chef"
      ? chefNav
      : role === "admin"
        ? adminNav
        : userNav;

  return (
    <div className="flex min-h-screen gap-0">
      {/* Sidebar */}
      <div
        className={`glass-card p-4 w-64 border-r border-white/10 fixed md:relative z-40 h-screen md:h-auto transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between md:hidden mb-6">
          <h3 className="font-bold text-lg">Menu</h3>
          <button onClick={() => setSidebarOpen(false)} className="btn-ghost">
            <LuX />
          </button>
        </div>
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive ? "pill" : "btn-ghost"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full">
        <div className="md:hidden flex items-center justify-between p-4 glass-card">
          <h2 className="font-bold">LocalChefBazaar</h2>
          <button onClick={() => setSidebarOpen(true)} className="btn-ghost">
            <LuMenu />
          </button>
        </div>
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
