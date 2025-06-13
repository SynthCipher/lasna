import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const DashboardOverview = () => {
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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
    {
      label: "Company Profile",
      description: "Update your company information",
      path: "/dashboard/profile",
      icon: assets.usericon,
    },
  ];

  const fetchCompanyJob = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { authorization: companyToken },
      });
      if (data.success) {
        setJobs(data.jobsData || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJob();
    }
  }, [companyToken]);

  // Calculate statistics from real data
  const totalJobs = jobs.length;
  // const totalJobs = 0;
  const activeJobs = jobs.filter((job) => job.visible !== false).length;
  const totalApplications = jobs.reduce(
    (sum, job) => sum + (job.applicants || 0),
    0
  );

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  return totalJobs === 0 ? (
    <div className="space-y-6">
      {/* Welcome Hero Section */}
      <div className="bg-gradient-to-br  from-blue-600 via-blue-700 to-indigo-800 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl mt-12 max-sm:text-xl font-bold mb-3">
            Welcome to LASNA Recruitment Hub!
          </h1>
          <p className="text-blue-100 text-lg mb-6 max-md:text-sm">
            Streamline your hiring process with our comprehensive recruitment
            platform
          </p>
          <button
            onClick={() => navigate("/dashboard/add-job")}
            className="bg-white text-sm text-blue-600 px-6 max-sm:px-3 py-3 max-md:text-sm rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2 max-sm:gap-1"
          >
            <svg
              className="w-5 h-5 max-sm:w-4 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Post Your First Job
          </button>
        </div>
      </div>

      {/* Recruitment Process Steps */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 max-sm:text-xl">
            Your Recruitment Journey
          </h2>
          <p className="text-gray-600">
            Follow these simple steps to find the perfect candidates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Add Job */}
          <div className="text-center group">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div className="bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Post Job Openings
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Create detailed job descriptions with requirements,
              responsibilities, and company culture to attract the right talent.
            </p>
            <button
              onClick={() => navigate("/dashboard/add-job")}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Create Job Post →
            </button>
          </div>

          {/* Step 2: Filter Applications */}
          <div className="text-center group">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
            <div className="bg-green-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Filter Applications
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Review and filter candidate applications based on skills,
              experience, and qualifications to shortlist the best fits.
            </p>
            <button
              onClick={() => navigate("/dashboard/view-applications")}
              className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm"
            >
              View Applications →
            </button>
          </div>

          {/* Step 3: Manage All Jobs */}
          <div className="text-center group">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7h6"
                />
              </svg>
            </div>
            <div className="bg-purple-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Manage All Jobs
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Control all your job postings from one centralized dashboard.
              Edit, pause, or close positions as needed.
            </p>
            <button
              onClick={() => navigate("/dashboard/manage-job")}
              className="mt-4 text-purple-600 hover:text-purple-700 font-medium text-sm"
            >
              Manage Jobs →
            </button>
          </div>
        </div>

        {/* Process Flow Arrows */}
        <div className="hidden md:block">
          <div className="flex justify-center items-center mt-8 space-x-32">
            <svg
              className="w-8 h-8 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            <svg
              className="w-8 h-8 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Platform Benefits */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-50 p-3 rounded-lg w-fit mx-auto mb-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Fast & Efficient
            </h3>
            <p className="text-sm text-gray-600">
              Streamlined process to get your jobs posted quickly
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-50 p-3 rounded-lg w-fit mx-auto mb-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Quality Candidates
            </h3>
            <p className="text-sm text-gray-600">
              Attract qualified professionals to your openings
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-50 p-3 rounded-lg w-fit mx-auto mb-3">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Easy Management
            </h3>
            <p className="text-sm text-gray-600">
              Manage all your recruitment in one place
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-50 p-3 rounded-lg w-fit mx-auto mb-3">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Smart Analytics
            </h3>
            <p className="text-sm text-gray-600">
              Track application metrics and performance
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r mb-6 from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mt-12 mb-2">Welcome to Your Dashboard</h1>
        <p className="text-blue-100">
          Manage your job postings and applications efficiently
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mb-8">
        {/* Active Jobs */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-3xl font-bold text-gray-900">{activeJobs}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Applications */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Applications</p>
              <p className="text-3xl font-bold text-gray-900">
                {totalApplications}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Jobs Overview */}
      {totalJobs > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Job Posts
            </h2>
            <button
              onClick={() => navigate("/dashboard/manage-job")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {jobs.slice(0, 3).map((job, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1  max-sm:hidden">
                      <img
                        src={assets.location_icon}
                        className="h-3 w-3"
                        alt=""
                      />
                      {job.location}
                    </span>
                    <span>{job.applicants} applicants</span>
                    <span className="max-sm:hidden">
                      {moment(job.date).fromNow()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.visible !== false
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {job.visible !== false ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {navigationItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <img src={item.icon} alt={item.label} className="w-8 h-8 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
