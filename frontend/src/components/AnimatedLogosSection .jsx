import React from "react";
import { assets } from "../assets/assets";

const ScrollingLogosSection = () => {
  const logoData = [
    { src: assets.microsoft_logo, alt: "Microsoft" },
    { src: assets.accenture_logo, alt: "Accenture" },
    { src: assets.walmart_logo, alt: "Walmart" },
    { src: assets.samsung_logo, alt: "Samsung" },
    { src: assets.adobe_logo, alt: "Adobe" },
    { src: assets.amazon_logo, alt: "Amazon" },
    { src: assets.gov_logo, alt: "gov" },
  ];

  const LogoCard = ({ src, alt }) => (
    <div className="flex-shrink-0 group">
      <div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1">
        <img
          className="h-4 w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          src={src}
          alt={alt}
        />
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-50 via-white to-slate-50 mx-2 mt-5 p-6 rounded-xl shadow-lg border border-gray-200/50">
      {/* Header */}
      <div className="text-center mb-2">
        <p className="text-lg font-semibold text-gray-700 mb-2">Trusted by </p>
        <div className="w-20 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* Scrolling Container */}
      <div className="relative overflow-hidden">
        {/* Gradient Fade Effects */}
        <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-1"></div>
        <div className="absolute right-0 top-0 w-10 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-1"></div>

        {/* Main Scrolling Track */}
        <div className="flex items-center py-4">
          {/* Seamless Scrolling Animation */}
          <div className="flex items-center gap-8 lg:gap-12 animate-scroll-seamless">
            {/* First Set of Logos */}
            {logoData.map((logo, index) => (
              <LogoCard key={`first-${index}`} src={logo.src} alt={logo.alt} />
            ))}

            {/* Duplicate Set for Seamless Loop */}
            {logoData.map((logo, index) => (
              <LogoCard key={`second-${index}`} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </div>

        {/* Pause animation on hover */}
        <div className="absolute inset-0 hover:pause-animation"></div>
      </div>

      <style jsx>{`
        @keyframes scroll-seamless {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-seamless {
          animation: scroll-seamless 30s linear infinite;
          width: fit-content;
        }

        .hover\\:pause-animation:hover ~ * .animate-scroll-seamless,
        .hover\\:pause-animation:hover .animate-scroll-seamless {
          animation-play-state: paused;
        }

        /* Ensure smooth scrolling */
        .animate-scroll-seamless {
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default ScrollingLogosSection;
