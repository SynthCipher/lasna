import React, { useContext,  useRef } from "react";
import { assets } from "../assets/assets";
import AnimatedLogosSection from "./AnimatedLogosSection ";
import { AppContext } from "../context/AppContext.jsx";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  //   useEffect(() => {
  //     console.log(isSearched);
  //     console.log(searchFilter);
  //   }, [isSearched, searchFilter]);

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
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-purple-800 to bg-purple-950 text-white py-16 text-center mx-2 rounded-xl">
        {/* <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">From Sarkari Recruitment to Local Openings – All in One Place</h2> */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10,000+ jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
          <div className="flex items-center ">
            <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
            <input
              type="text"
              placeholder="Search for Jobs"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={titleRef}
            />
          </div>
          <div className="flex items-center ">
            <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
            <input
              type="text"
              placeholder="location"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={locationRef}
            />
          </div>
          <button
            onClick={onSearch}
            className="bg-blue-600 px-6 py-2  rounded text-white m-1"
          >
            Search
          </button>
        </div>
      </div>
      <AnimatedLogosSection />
    </div>
  );
};

export default Hero;
