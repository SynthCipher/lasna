import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext.jsx";
import ScrollingLogosSection from "./AnimatedLogosSection .jsx";
import { Typewriter } from "react-simple-typewriter";
const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
    console.log({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setTimeout(() => {
      const jobListSection = document.getElementById("job-list");
      if (jobListSection) {
        jobListSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, 100);
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10 ">
      {/* Modern Hero Section with Minimalist Design */}
      <div className="relative min-h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 mx-2 max-sm:py-10 rounded-3xl overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gray-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-200/25 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Content */}
        <div className="relative  flex flex-col items-center justify-center min-h-[500px] px-6 text-center">
          {/* Minimalist Typography */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-gray-900">
              <div
                style={{
                  textAlign: "center",
                  color: "#161616",
                  fontFamily: "oblong",
                  fontWeight: "400",
                  letterSpacing: 4,
                  wordWrap: "break-word",
                }}
              >
                lasna
              </div>

              <span className="block text-sm sm:text-base md:text-lg font-medium text-gray-500 tracking-wide  text-center uppercase">
                by <span className="text-black font-semibold">Onela</span>
              </span>
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Connect with local employers and explore{" "}
              <span className="text-blue-600 font-medium">
                <Typewriter
                  words={["jobs", "careers", "opportunities", "roles"]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>{" "}
              across the region
            </p>
          </div>

          {/* Modern Search Card with Minimalist Design */}
          <div className="w-full max-w-3xl">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-2 bg-white/50 backdrop-blur-lg border border-gray-200 rounded-xl p-4 md:p-2 shadow-md">
              {/* Title Input - 2/5 */}
              <div className="flex items-center basis-full md:basis-2/5 bg-white/70 rounded-lg px-3 py-2 shadow-sm">
                <img
                  className="h-5 mr-2"
                  src={assets.search_icon}
                  alt="Search"
                />
                <input
                  type="text"
                  placeholder="Search for Jobs"
                  className="bg-transparent text-sm w-full outline-none text-gray-800 placeholder-gray-400"
                  ref={titleRef}
                />
              </div>

              {/* Location Input - 2/5 */}
              <div className="flex items-center basis-full md:basis-2/5 bg-white/70 rounded-lg px-3 py-2 shadow-sm">
                <img
                  className="h-5 mr-2"
                  src={assets.location_icon}
                  alt="Location"
                />
                <input
                  type="text"
                  placeholder="Leh, Kargil"
                  className="bg-transparent text-sm w-full outline-none text-gray-800 placeholder-gray-400"
                  ref={locationRef}
                />
              </div>

              {/* Search Button - 1/5 */}
              <div className="basis-full md:basis-1/5 cursor-pointer">
                <button
                  onClick={onSearch}
                  className="w-full h-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-all"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 max-md:hidden">
            {["Government", "Tourism", "Healthcare", "Education", "NGO"].map(
              (category) => (
                <button
                  key={category}
                  className="px-6 py-2 bg-white/40 backdrop-blur-sm border border-gray-200 rounded-full text-gray-700 text-sm font-medium "
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <ScrollingLogosSection />
    </div>
  );
};

export default Hero;
