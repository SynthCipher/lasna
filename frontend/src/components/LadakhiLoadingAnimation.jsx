import React, { useEffect, useState } from "react";

const LadakhiLoadingAnimation = ({
  title = "Loading Your Opportunity",
  showProverb = true,
  customMessages = null,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const defaultLadakhiJobMessages = [
    "Connecting you to opportunities in the Land of High Passes...",
    "Exploring careers in Ladakh's growing tourism sector...",
    "Discovering jobs that honor Ladakhi traditions and innovation...",
    "Finding opportunities in Leh's expanding business district...",
    "Connecting with employers who value local talent...",
    "Searching for roles in sustainable development across Ladakh...",
    "Exploring positions in healthcare, education, and technology...",
    "Building bridges between traditional skills and modern careers...",
    "Discovering remote work opportunities in the Himalayas...",
    "Connecting with startups in Ladakh's emerging tech scene...",
  ];

  const messages = customMessages || defaultLadakhiJobMessages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 bg-gradient-to-b from-blue-50 to-white">
      {/* Mountain-inspired loading animation */}
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div
          className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-orange-400 rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.8s" }}
        ></div>
        <div
          className="absolute inset-2 w-16 h-16 border-2 border-transparent border-r-red-400 rounded-full animate-spin"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      {/* Animated text */}
      <div className="text-center max-w-lg">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">{title}</h3>
        <div className="min-h-[4rem] flex items-center justify-center">
          <p className="text-gray-600 text-lg leading-relaxed animate-pulse transition-all duration-500">
            {messages[currentMessageIndex]}
          </p>
        </div>
      </div>

      {/* Decorative elements inspired by Ladakhi prayer flags */}
      <div className="mt-8 flex space-x-3">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce shadow-lg"></div>
        <div
          className="w-3 h-3 bg-white border-2 border-blue-300 rounded-full animate-bounce shadow-lg"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-3 h-3 bg-red-500 rounded-full animate-bounce shadow-lg"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-3 h-3 bg-green-500   rounded-full animate-bounce shadow-lg"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce shadow-lg"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>

      {showProverb && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 italic max-w-md">
            "Every mountain peak is within reach if you just keep climbing"
          </p>
          <p className="text-xs text-gray-400 mt-1">- Ladakhi Wisdom</p>
        </div>
      )}

      {/* Responsive mountain silhouette decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-100 to-transparent opacity-30">
        {/* Mobile Mountain */}
        <svg viewBox="0 0 320 60" className="w-full h-full sm:hidden">
          <path
            d="M0,60 L0,35 L40,15 L80,28 L120,8 L160,22 L200,12 L240,25 L280,18 L320,30 L320,60 Z"
            fill="currentColor"
            className="text-gray-300 -mb-20 "
          />
        </svg>

        {/* Tablet Mountain */}
        <svg
          viewBox="0 0 600 60"
          className="w-full h-full hidden sm:block lg:hidden"
        >
          <path
            d="M0,60 L0,32 L60,8 L120,22 L180,5 L240,18 L300,10 L360,25 L420,12 L480,28 L540,15 L600,30 L600,60 Z"
            fill="currentColor"
            className="text-gray-300"
          />
        </svg>

        {/* Desktop Mountain */}
        <svg viewBox="0 0 1200 60" className="w-full h-full hidden lg:block">
          <path
            d="M0,60 L0,35 L80,5 L160,20 L240,8 L320,25 L400,12 L480,28 L560,15 L640,30 L720,10 L800,22 L880,18 L960,32 L1040,8 L1120,25 L1200,30 L1200,60 Z"
            fill="currentColor"
            className="text-gray-300"
          />
        </svg>
      </div>
    </div>
  );
};

export default LadakhiLoadingAnimation;
