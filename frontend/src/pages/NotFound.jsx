import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Auto redirect countdown - starts immediately
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at top */}
      <Navbar />

      {/* Main content area */}
      <div className="flex-grow bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-100 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-100 rounded-full opacity-10 animate-bounce"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="text-center max-w-2xl mx-auto relative z-10 py-6">
          {/* Animated 404 with mountain peaks */}
          <div className="relative mb-6">
            <div className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text animate-pulse">
              4
              <span className="relative inline-block text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text">
                0
                {/* Mountain peak decoration in the 0 */}
                <svg
                  className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-6 md:w-10 md:h-10 text-orange-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L8 8h8l-4-6zm0 0L16 8H8l4-6z" />
                </svg>
              </span>
              4
            </div>

            {/* Floating elements around 404 */}
            <div
              className="absolute -top-4 -left-4 w-4 h-4 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute -top-2 -right-8 w-3 h-3 bg-orange-400 rounded-full animate-bounce"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute -bottom-6 left-8 w-5 h-5 bg-red-400 rounded-full animate-bounce"
              style={{ animationDelay: "2.5s" }}
            ></div>
          </div>

          {/* Main content */}
          <div className="space-y-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Oops! Lost in the Mountains?
            </h2>
            <p className="text-base text-gray-600 mb-4 leading-relaxed">
              It seems like you've wandered off the beaten path. The page you're
              looking for doesn't exist in our digital landscape of Ladakh job
              opportunities.
            </p>

            {/* Inspirational message */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
              <p className="text-gray-700 italic text-sm mb-1">
                "Even the highest peaks are reached one step at a time"
              </p>
              <p className="text-xs text-gray-500">- Ladakhi Wisdom</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <button
              onClick={() => navigate("/")}
              className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-base transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
            >
              <svg
                className="w-4 h-4 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Return Home
            </button>

            <button
              onClick={() => navigate(-1)}
              className="group px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 rounded-xl font-semibold text-base transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
            >
              <svg
                className="w-4 h-4 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
          </div>

          {/* Auto redirect section */}
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-center">
              <div className="mb-2">
                <div className="text-xl font-bold text-orange-600 mb-1">
                  {countdown}
                </div>
                <p className="text-gray-600 text-sm">
                  Redirecting to homepage in {countdown} seconds...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default NotFound;