import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { searchFilter, jobs, isSearched, setSearchFilter } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategories, setSelectCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // remove if already selected
          : [...prev, category] // add if not selected
    );
  };
  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    console.log("selectedCategories : ", selectedCategories);
    console.log("selectLocations : ", selectedLocations);
  }, [selectedCategories, selectedLocations]);

  useEffect(() => {
    // Checks if job matches selected categories or if no category is selected
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    // Checks if job matches selected locations or if no location is selected
    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.district);

    // Checks if job title matches the search filter (case insensitive) or if search is empty
    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    // Checks if job location matches the search filter (case insensitive) or if search is empty
    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    // Create a new filtered jobs array:
    // - slice() to copy the array
    // - reverse() to show latest jobs first
    // - filter() to apply all four matching functions above
    const newFilteredJobs = jobs
      .slice() // make a shallow copy of jobs array
      .reverse() // reverse to show most recent jobs first
      .filter(
        (job) =>
          matchesCategory(job) && // job matches selected category
          matchesLocation(job) && // job matches selected location
          matchesTitle(job) && // job matches title search
          matchesSearchLocation(job) // job matches location search
      );

    setFilteredJobs(newFilteredJobs); // Update the filtered jobs state
    setCurrentPage(1); // Reset pagination to page 1 after filtering
  }, [jobs, selectedCategories, selectedLocations, searchFilter]); // Dependencies: re-run when any of these change

  return (
    <div className="container 2xl:px-20 mx-auto md:gap-4 flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Side Bar */}
      <div className="mx-4 lg:w-1/4 bg-white/30 rounded-xl shadow-sm border border-gray-100 p-4">
        {/* Search Filter from Hero Component */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <div className="mb-6">
              <h3 className="font-semibold text-xl text-gray-800 mb-4 flex items-center gap-2">
                Current Search
              </h3>
              <div className="flex flex-wrap gap-2">
                {searchFilter?.title && (
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 px-3 py-2 rounded-lg text-sm font-medium text-blue-700 transition-all hover:shadow-sm">
                    <span className="truncate max-w-[120px]">
                      {searchFilter.title}
                    </span>
                    <button
                      onClick={() => {
                        setSearchFilter((prev) => ({ ...prev, title: "" }));
                      }}
                      className="flex-shrink-0 w-4 h-4 flex items-center justify-center rounded-full bg-blue-200 hover:bg-blue-300 transition-colors"
                    >
                      <img
                        className="w-2.5 h-2.5"
                        src={assets.cross_icon}
                        alt="Remove"
                      />
                    </button>
                  </span>
                )}
                {searchFilter?.location && (
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 px-3 py-2 rounded-lg text-sm font-medium text-emerald-700 transition-all hover:shadow-sm">
                    <span className="truncate max-w-[120px]">
                      {searchFilter.location}
                    </span>
                    <button
                      onClick={() => {
                        setSearchFilter((prev) => ({ ...prev, location: "" }));
                      }}
                      className="flex-shrink-0 w-4 h-4 flex items-center justify-center rounded-full bg-emerald-200 hover:bg-emerald-300 transition-colors"
                    >
                      <img
                        className="w-2.5 h-2.5"
                        src={assets.cross_icon}
                        alt="Remove"
                      />
                    </button>
                  </span>
                )}
              </div>
              <div className="border-b border-gray-100 mt-6"></div>
            </div>
          )}

        {/* Mobile Filter Toggle */}
        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="w-full  px-4 py-2.5 rounded-lg border-2 border-gray-200 lg:hidden font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-between"
        >
          <span>Filters</span>
          <div
            className={`transform transition-transform duration-200 ${
              showFilter ? "rotate-180" : ""
            }`}
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {/* Categories Filter */}
        <div className={`${showFilter ? "block" : "max-lg:hidden"} mb-8`}>
          <h4 className="font-semibold pt-4 px-2 text-lg text-gray-800 mb-4 flex items-center gap-2">
            Categories
          </h4>
          <div className="space-y-3">
            {JobCategories.map((category, index) => (
              <label
                key={index}
                className="flex items-center gap-3 pl-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 transition-all"
                  />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm font-medium">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div className={`${showFilter ? "block" : "max-lg:hidden"}`}>
          <h4 className="font-semibold px-2 text-lg text-gray-800 mb-4 flex items-center gap-2">
            District
          </h4>
          <div className="space-y-3">
            {JobLocations.map((location, index) => (
              <label
                key={index}
                className="flex items-center gap-3 pl-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    onChange={() => handleLocationChange(location)}
                    checked={selectedLocations.includes(location)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 transition-all"
                  />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm font-medium">
                  {location}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* JOB LIST */}
      <section className="w-full lg:w-3/4 mr-4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest Job Opening
        </h3>
        <p className="mb-8">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs && filteredJobs.length > 0 ? (
            filteredJobs
              .slice((currentPage - 1) * 6, currentPage * 6)
              .map((job, index) => <JobCard key={index} job={job} />)
          ) : (
            <div className="border border-gray-300 rounded-lg p-8 shadow-sm text-center col-span-full">
              <svg
                className="mx-auto mb-4 w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No Jobs Found
              </h2>
              <p className="text-gray-500 text-base">
                We couldn’t find any jobs matching your current search or
                filters.
                <br />
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                src={assets.left_arrow_icon}
                alt=""
              />
            </a>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, index) => (
                <a key={index} href="#job-list">
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}
            <a href="#job-list">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(filteredJobs.length / 6)
                    )
                  )
                }
                src={assets.right_arrow_icon}
                alt=""
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
