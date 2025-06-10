import React from "react";

const LoadingApplication = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Main Loading Container */}
        <div className="relative mb-8">
          {/* Spinning Prayer Wheel */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-orange-200 rounded-full animate-spin border-t-orange-500 border-r-red-500"></div>
            <div className="absolute inset-2 border-4 border-blue-200 rounded-full animate-spin-reverse border-t-blue-500 border-l-indigo-500"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <div className="text-white text-xl">🏔️</div>
            </div>
          </div>

          {/* Prayer Flags Animation */}
          <div className="flex justify-center space-x-1 mb-6">
            {[
              "bg-blue-500",
              "bg-white",
              "bg-red-500",
              "bg-green-500",
              "bg-yellow-500",
            ].map((color, index) => (
              <div
                key={index}
                className={`w-6 h-8 ${color} flag-wave opacity-80`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
                }}
              ></div>
            ))}
          </div>

          {/* Mountain Silhouette */}
          <div className="relative h-16 overflow-hidden mb-4">
            <svg className="w-full h-full" viewBox="0 0 400 100" fill="none">
              <path
                d="M0 100 L50 60 L100 40 L150 20 L200 10 L250 25 L300 45 L350 65 L400 80 L400 100 Z"
                fill="url(#mountain-gradient)"
                className="mountain-path"
              />
              <defs>
                <linearGradient
                  id="mountain-gradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#1e40af" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-700 mb-2">
           Loading...
          </h2>
      
          {/* Dots Animation */}
          <div className="flex justify-center space-x-2 mt-4">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"
                style={{ animationDelay: `${index * 0.3}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl">❄️</div>
          <div className="absolute top-20 right-20 text-4xl">🏔️</div>
          <div className="absolute bottom-20 left-20 text-5xl">🕉️</div>
          <div className="absolute bottom-10 right-10 text-3xl">🙏</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes flag-wave {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-2px) rotate(1deg);
          }
          50% {
            transform: translateY(-1px) rotate(-1deg);
          }
          75% {
            transform: translateY(-3px) rotate(1deg);
          }
        }

        @keyframes mountain-glow {
          0%,
          100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.1);
          }
        }

        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }

        .flag-wave {
          animation: flag-wave 2s ease-in-out infinite;
        }

        .mountain-path {
          animation: mountain-glow 4s ease-in-out infinite;
        }

        /* Ladakhi-inspired color palette */
        .bg-ladakhi-blue {
          background-color: #1e40af;
        }
        .bg-ladakhi-orange {
          background-color: #ea580c;
        }
        .bg-ladakhi-red {
          background-color: #dc2626;
        }
      `}</style>
    </div>
  );
};
export default LoadingApplication;
