import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin, companyToken, companyData } =
    useContext(AppContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="shadow-sm border-b border-gray-100">
      <div className="flex justify-between items-center mx-3 sm:mx-5 py-3">
        <img
          onClick={() => navigate("/")}
          src={assets.lasnalogo}
          // src={assets.logo}
          alt=""
          className="cursor-pointer h-10 p-0.5 sm:ml-8 ml-0 hover:opacity-80 transition-opacity"
        />
        

        {/* Show different content based on login status */}
        {companyToken && companyData ? (
          // Recruiter is logged in - show Dashboard button
          <div
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Dashboard
          </div>
        ) : user ? (
          // Regular user is logged in
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/applications"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:underline underline-offset-4 text-sm"
            >
              <span className="hidden sm:inline">My Applications</span>
              <span className="sm:hidden">Applied</span>
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-gray-700 font-medium text-sm hidden sm:block">
                Hi, {user.fullName}
              </span>
              <span className="text-gray-700 font-medium text-xs sm:hidden">
                {user.firstName}
              </span>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-7 h-7 sm:w-8 sm:h-8 hover:ring-2 hover:ring-blue-200 transition-all",
                  },
                }}
              />
            </div>
          </div>
        ) : (
          // No one is logged in - show login buttons
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Recruiter Login Button */}
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="group cursor-pointer relative px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-1 sm:gap-2 shadow-sm hover:shadow"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 group-hover:text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="hidden sm:inline">Recruiter</span>
              <span className="sm:hidden">HR</span>
              <div className="absolute -top-1 -right-1 hidden sm:inline bg-orange-500 text-white text-xs px-1 sm:px-1.5 py-0.5 rounded-full font-bold">
                HR
              </div>
            </button>

            {/* Job Seeker Login Button */}
            <button
              onClick={() => openSignIn()}
              className="bg-gradient-to-r cursor-pointer  from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1 sm:gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-xs sm:text-sm"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="hidden sm:inline">Job Seeker</span>
              <span className="sm:hidden">Login</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
