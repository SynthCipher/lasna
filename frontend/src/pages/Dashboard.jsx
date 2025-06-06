import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
import RecruiterNavbar from "../components/RecruiterNavbar";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true); // Auto-collapse on mobile
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const navigationItems = [
    {
      to: "/dashboard/manage-job",
      icon: assets.home_icon,
      label: "Manage Jobs",
      description: "View and edit job postings",
    },
    {
      to: "/dashboard/view-applications",
      icon: assets.person_tick_icon,
      label: "Applications",
      description: "Review candidate applications",
    },
    {
      to: "/dashboard/add-job",
      icon: assets.add_icon,
      label: "Add Job",
      description: "Create new job posting",
    },
  ];

  const handleNavLinkClick = () => {
    // Auto-hide sidebar on mobile when navlink is clicked
    if (isMobile) {
      setIsSidebarCollapsed(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />

      <div className="flex relative">
        {/* Enhanced Sidebar */}
        <div
          className={`${
            isSidebarCollapsed ? "w-16" : "w-64"
          } min-h-screen bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out ${
            isMobile && !isSidebarCollapsed ? "fixed inset-y-0 left-0 z-50" : ""
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              {!isSidebarCollapsed && (
                <h2 className="text-lg font-semibold text-gray-800">
                  Dashboard
                </h2>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                    isSidebarCollapsed ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="mt-4">
            <ul className="space-y-1 px-3">
              {navigationItems.map((item, index) => (
                <li key={index} className="relative">
                  <NavLink
                    to={item.to}
                    onClick={handleNavLinkClick}
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500 shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <img
                        className={`flex-shrink-0 w-5 h-5 transition-colors ${
                          isSidebarCollapsed ? "mx-auto" : ""
                        }`}
                        src={item.icon}
                        alt={item.label}
                      />

                      {!isSidebarCollapsed && (
                        <div className="ml-4 min-w-0 flex-1">
                          <p className="font-medium truncate">{item.label}</p>
                          <p className="text-xs text-gray-500 truncate">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Active indicator */}
                    {/* {!isSidebarCollapsed && (
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          isActive
                            ? "flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"
                            : "hidden"
                        }
                      />
                    )} */}
                    
                  </NavLink>

                  {/* Tooltip for collapsed state */}
                  {isSidebarCollapsed && (
                    <div className="absolute left-16 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-300">
                        {item.description}
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

         
        </div>

        {/* Mobile Overlay */}
        {isMobile && !isSidebarCollapsed && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => {
              setIsSidebarCollapsed(true);
            }}
          />
        )}

        {/* Main Content Area */}
        <div
          className={`flex-1 min-h-screen ${
            isMobile && !isSidebarCollapsed ? "ml-0" : ""
          }`}
        >
          <div className="p-6 bg-white m-4 rounded-xl shadow-sm border border-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
