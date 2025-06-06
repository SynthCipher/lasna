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
      selectedLocations.includes(job.location);

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
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Side Bar */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Search Filter from Hero COmponent */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600 space-x-2 ">
                {searchFilter?.title && (
                  <span className="inline-flex items-center gap-2.5 mb-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}
                    <img
                      onClick={() => {
                        setSearchFilter((prev) => ({ ...prev, title: "" }));
                      }}
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
                {searchFilter?.location && (
                  <span className="inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      onClick={() => {
                        setSearchFilter((prev) => ({ ...prev, location: "" }));
                      }}
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}

        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden cursor-pointer"
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        {/* Categories Filter */}
        <div className={showFilter ? "max-lg:pl-8" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 -ml-4">Search By Category</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* locaton Filter */}
        <div className={showFilter ? "max-lg:pl-8" : "max-lg:hidden pt-14"}>
          <h4 className="font-medium text-lg py-4 -ml-4">Search By Location</h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* JOB LIST */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
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
