import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import LadakhiLoadingAnimation from "../components/LadakhiLoadingAnimation";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { SignIn, useAuth, useClerk } from "@clerk/clerk-react";
import { FaCopy, FaExternalLinkAlt, FaMailBulk } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const ApplyJob = () => {
  const { id } = useParams();

  const { getToken, isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const {
    jobs,
    backendUrl,
    userData,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const [jobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  /**
   * Fetches job details from the backend API using the provided job ID.
   * On success, updates the job data state with the retrieved job information.
   * Displays an error toast if the request fails or if the API response indicates failure.
   */
  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);
      if (data.success) {
        console.log(data.job);
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Handles the job application process for the current user.
   */
  const applyHandler = async () => {
    try {
      // Check if user is signed in first
      if (!isSignedIn) {
        // Trigger the Clerk sign-in modal
        await openSignIn();
        return;
      }

      if (!userData) {
        toast.error("Please complete your profile setup to apply for jobs.");
        navigate("/applications");
      }

      if (!userData.resume) {
        navigate("/applications");
        return toast.error("Upload your resume before applying for a job.");
      }

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/users/apply",
        { jobId: jobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        console.log(data.job);
        fetchUserApplications();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Handle the case where user cancels the sign-in modal
      if (error.code === "clerk_cancelled") {
        // Do nothing, user cancelled the sign-in
        return;
      }
      toast.error(error.message);
    }
  };

  /**
   * Checks if the current user has already applied to the specified job.
   */
  const checkAlreadyApplied = () => {
    const hasAppplied = userApplications.some(
      (item) => item.jobId._id === jobData._id
    );
    setIsAlreadyApplied(hasAppplied);
  };

  // Helper function to format job type
  const formatJobType = (jobType) => {
    if (!jobType) return "Full-time";
    return jobType
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Helper function to format experience level
  const formatExperienceLevel = (level) => {
    if (!level) return "Not specified";
    return level
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Check if deadline has passed using the job's deadlineDate
  const isDeadlinePassed = jobData
    ? moment().isAfter(moment(jobData.deadlineDate).endOf("day"))
    : false;
  const daysUntilDeadline = jobData
    ? moment(jobData.deadlineDate)
        .startOf("day")
        .diff(moment().startOf("day"), "days")
    : 0;

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(jobData.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailClick = () => {
    window.open(`mailto:${jobData.contactEmail}`, "_blank");
  };

  const handleShare = () => {
    const shareData = {
      title: jobData.title,
      text: `Check out this job opening at ${jobData.companyId.name}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      // Fallback for browsers that don't support Web Share API
      toast.info(
        "Sharing not supported on this browser. Copy the link manually."
      );
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (jobData && userApplications.length > 0) {
      checkAlreadyApplied();
    }
  }, [jobData, userApplications, id]);

  return jobData ? (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container px-4 2xl:px-20 mx-auto py-8">
          {/* Main Job Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            {/* Header Section with Company Info */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                  <div className="bg-white p-1 rounded-full shadow-sm">
                    <img
                      className="h-20 w-20 rounded-full object-cover"
                      src={jobData.companyId.image}
                      alt={`${jobData.companyId.name} Logo`}
                    />
                  </div>
                  <div className="text-white">
                    <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                      {jobData.title}
                    </h1>
                    <p className="text-gray-200 text-lg font-medium mb-3">
                      {jobData.companyId.name}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center border-1 border-gray-600 gap-2 bg-gray-700/50 px-3 py-1 rounded-full">
                        <img
                          src={assets.location_icon}
                          alt=""
                          className="w-4 h-4"
                        />
                        {jobData.location}, {jobData.district}
                      </span>
                      <span className="flex items-center border-1 border-gray-600 gap-2 bg-gray-700/50 px-3 py-1 rounded-full">
                        <img
                          src={assets.person_icon}
                          alt=""
                          className="w-4 h-4"
                        />
                        {formatExperienceLevel(jobData.experienceRequired)}
                      </span>
                      <span className="flex items-center border-1 border-gray-600 gap-2 bg-gray-700/50 px-3 py-1 rounded-full">
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
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6.341"
                          />
                        </svg>
                        {formatJobType(jobData.jobType)}, {jobData.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Apply Button Section */}
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={applyHandler}
                    disabled={
                      isAlreadyApplied ||
                      isDeadlinePassed ||
                      !jobData.isActive
                       ||
                      isSignedIn
                    }
                    className={`px-8 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      isAlreadyApplied
                        ? "border-1 border-green-500 text-green-600 cursor-not-allowed"
                        : isDeadlinePassed || !jobData.isActive
                        ? "bg-red-600 text-white cursor-not-allowed"
                        : "bg-white text-gray-800 hover:bg-gray-100 shadow-md hover:shadow-lg"
                    }`}
                  >
                    {isAlreadyApplied
                      ? "Already Applied"
                      : isDeadlinePassed
                      ? "Deadline Passed"
                      : !jobData.isActive
                      ? "Position Closed"
                      : !isSignedIn
                      ? "Sign in to Apply"
                      : "Apply Now"}
                  </button>
                  {/* Social Share Buttons */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-1 px-2 border-1 py-1 text-xs font-medium text-gray-300 hover:text-white transition-colors rounded-md hover:bg-gray-700/50"
                        title="Share this job"
                      >
                        <FaShareAlt className="w-3 h-3" />
                        Share
                      </button>
                      <FacebookShareButton url={window.location.href}>
                        <FacebookIcon
                          size={24}
                          round
                          className="hover:scale-110 transition-transform"
                        />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={window.location.href}
                        title={jobData.title}
                      >
                        <TwitterIcon
                          size={24}
                          round
                          className="hover:scale-110 transition-transform"
                        />
                      </TwitterShareButton>
                      <WhatsappShareButton
                        url={window.location.href}
                        title={jobData.title}
                      >
                        <WhatsappIcon
                          size={24}
                          round
                          className="hover:scale-110 transition-transform"
                        />
                      </WhatsappShareButton>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs">
                    Posted {moment(jobData.createdAt || jobData.date).fromNow()}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Salary Info */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <img src={assets.money_icon} alt="" className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-emerald-600 font-semibold text-lg">
                        {jobData.salary ? `${jobData.salary} ` : "Negotiable"}
                      </p>
                      <p className="text-emerald-700 text-sm"> / Month</p>
                    </div>
                  </div>
                </div>

                {/* Deadline Info */}
                <div
                  className={`${
                    isDeadlinePassed
                      ? "bg-red-50 border-red-200"
                      : daysUntilDeadline <= 7
                      ? "bg-orange-50 border-orange-200"
                      : "bg-blue-50 border-blue-200"
                  } border rounded-xl p-4`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`${
                        isDeadlinePassed
                          ? "bg-red-100"
                          : daysUntilDeadline <= 7
                          ? "bg-orange-100"
                          : "bg-blue-100"
                      } p-2 rounded-lg`}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          isDeadlinePassed
                            ? "text-red-600"
                            : daysUntilDeadline <= 7
                            ? "text-orange-600"
                            : "text-blue-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`${
                          isDeadlinePassed
                            ? "text-red-600"
                            : daysUntilDeadline <= 7
                            ? "text-orange-600"
                            : "text-blue-600"
                        } font-semibold`}
                      >
                        {isDeadlinePassed
                          ? "Deadline Passed"
                          : daysUntilDeadline === 0
                          ? "Today"
                          : daysUntilDeadline === 1
                          ? "Tomorrow"
                          : `${daysUntilDeadline} days left`}
                      </p>
                      <p
                        className={`${
                          isDeadlinePassed
                            ? "text-red-700"
                            : daysUntilDeadline <= 7
                            ? "text-orange-700"
                            : "text-blue-700"
                        } text-sm`}
                      >
                        {moment(jobData.deadlineDate).format("MMM DD, YYYY")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Application Status */}
                <div
                  className={`${
                    isAlreadyApplied
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                  } border rounded-xl p-4`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`${
                        isAlreadyApplied ? "bg-green-100" : "bg-gray-100"
                      } p-2 rounded-lg`}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          isAlreadyApplied ? "text-green-600" : "text-gray-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            isAlreadyApplied
                              ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              : "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          }
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`${
                          isAlreadyApplied ? "text-green-600" : "text-gray-600"
                        } font-semibold`}
                      >
                        {isAlreadyApplied ? "Applied" : "Not Applied"}
                      </p>
                      <p
                        className={`${
                          isAlreadyApplied ? "text-green-700" : "text-gray-700"
                        } text-sm`}
                      >
                        Application Status
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              {jobData.skills && jobData.skills.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {jobData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* contact Details */}
              {jobData?.contactEmail && (
                <div className="bg-gradient-to-r mt-2 from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaMailBulk className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Contact
                        </p>
                        <p
                          className="text-blue-600 max-sm:text-sm font-semibold hover:text-blue-800 transition-colors cursor-pointer"
                          onClick={handleEmailClick}
                        >
                          {jobData.contactEmail}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2 max-sm:space-x-0">
                      <button
                        onClick={handleCopyEmail}
                        className="p-2 text-gray-500  hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
                        title="Copy email"
                      >
                        <FaCopy className="w-4 h-4" />
                      </button>

                      <button
                        onClick={handleEmailClick}
                        className="p-2 text-gray-500 max-sm:hidden hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
                        title="Send email"
                      >
                        <FaExternalLinkAlt className="w-4 h-4 " />
                      </button>
                    </div>
                  </div>

                  {copied && (
                    <div className="mt-2 text-sm text-green-600 font-medium">
                      ✓ Email copied to clipboard
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Job Description - Left Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Job Description
                  </h2>
                  <div className="h-1 bg-blue-600 rounded-full flex-1 max-w-20"></div>
                </div>

                <div
                  className="prose prose-gray max-w-none [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800 [&_a]:cursor-pointer [&_a]:transition-colors [&_a]:duration-200"
                  dangerouslySetInnerHTML={{ __html: jobData.description }}
                />

                {/* Second Apply Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={applyHandler}
                    disabled={
                      isAlreadyApplied ||
                      isDeadlinePassed ||
                      !jobData.isActive 
                      ||
                      isSignedIn
                    }
                    className={`w-full sm:w-auto px-8 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      isAlreadyApplied
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : isDeadlinePassed || !jobData.isActive
                        ? "bg-red-500 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                    }`}
                  >
                    {isAlreadyApplied
                      ? "✓ Already Applied"
                      : isDeadlinePassed
                      ? "⚠ Deadline Passed"
                      : !jobData.isActive
                      ? "⚠ Position Closed"
                      : !isSignedIn
                      ? "🔐 Sign in to Apply"
                      : "Apply for this Position"}
                  </button>
                </div>
              </div>
            </div>

            {/* More Jobs Sidebar - Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  More from {jobData.companyId.name}
                </h3>

                {(() => {
                  const companyJobs = jobs.filter(
                    (job) =>
                      job._id !== jobData._id &&
                      job.companyId._id === jobData.companyId._id &&
                      job.isActive &&
                      job.visible &&
                      moment().isBefore(moment(job.deadlineDate).endOf("day"))
                  );

                  if (companyJobs.length === 0) {
                    return (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6.341"
                            />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">
                          That's all from {jobData.companyId.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4">
                          No other active positions available from this company.
                        </p>
                        <button
                          onClick={() => {
                            navigate("/");
                            setTimeout(() => {
                              const element =
                                document.getElementById("job-list");
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                              }
                            }, 100);
                          }}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 mx-auto"
                        >
                          Explore all jobs
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
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  }

                  const appliedJobsIds = new Set(
                    userApplications.map((app) => app.jobId && app.jobId._id)
                  );

                  const availableJobs = companyJobs.filter((job) => {
                    return !appliedJobsIds.has(job._id);
                  });

                  if (availableJobs.length === 0) {
                    return (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-green-500"
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
                        <h4 className="font-semibold text-gray-800 mb-2">
                          All Applied!
                        </h4>
                        <p className="text-gray-600 text-sm mb-4">
                          You've applied to all available positions from{" "}
                          {jobData.companyId.name}.
                        </p>
                        <button
                          onClick={() => {
                            navigate("/");
                            setTimeout(() => {
                              const element =
                                document.getElementById("job-list");
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                              }
                            }, 100);
                          }}
                          className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1 mx-auto"
                        >
                          Explore more jobs
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
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-4">
                      {availableJobs.slice(0, 2).map((job, index) => (
                        <JobCard job={job} key={index} />
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <LadakhiLoadingAnimation />
  );
};

export default ApplyJob;

// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import LadakhiLoadingAnimation from "../components/LadakhiLoadingAnimation";
// import Navbar from "../components/Navbar";
// import { assets } from "../assets/assets";
// import kconvert from "k-convert";
// import moment from "moment";
// import JobCard from "../components/JobCard";
// import Footer from "../components/Footer";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useAuth, useClerk } from "@clerk/clerk-react";

// const ApplyJob = () => {
//   const { id } = useParams();

//   // Hardcoded deadline for all jobs (you can change this date)
//   const deadline = "2025-06-10";

//   const { getToken, isSignedIn } = useAuth();
//   const { openSignIn } = useClerk();

//   const {
//     jobs,
//     backendUrl,
//     userData,
//     userApplications,
//     fetchUserApplications,
//   } = useContext(AppContext);
//   const navigate = useNavigate();

//   const [jobData, setJobData] = useState(null);
//   const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

//   /**
//    * Fetches job details from the backend API using the provided job ID.
//    * On success, updates the job data state with the retrieved job information.
//    * Displays an error toast if the request fails or if the API response indicates failure.
//    */
//   const fetchJob = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);
//       if (data.success) {
//         console.log(data.job);
//         setJobData(data.job);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   /**
//    * Handles the job application process for the current user.
//    */
//   const applyHandler = async () => {
//     try {
//       // Check if user is signed in first
//       if (!isSignedIn) {
//         // Trigger the Clerk sign-in modal
//         await openSignIn();
//         return;
//       }

//       if (!userData) {
//         return toast.error(
//           "Please complete your profile setup to apply for jobs."
//         );
//       }

//       if (!userData.resume) {
//         navigate("/applications");
//         return toast.error("Upload your resume before applying for a job.");
//       }

//       const token = await getToken();

//       const { data } = await axios.post(
//         backendUrl + "/api/users/apply",
//         { jobId: jobData._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (data.success) {
//         console.log(data.job);
//         fetchUserApplications();
//         toast.success(data.message);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       // Handle the case where user cancels the sign-in modal
//       if (error.code === "clerk_cancelled") {
//         // Do nothing, user cancelled the sign-in
//         return;
//       }
//       toast.error(error.message);
//     }
//   };

//   /**
//    * Checks if the current user has already applied to the specified job.
//    */
//   const checkAlreadyApplied = () => {
//     const hasAppplied = userApplications.some(
//       (item) => item.jobId._id === jobData._id
//     );
//     setIsAlreadyApplied(hasAppplied);
//   };

//   // Check if deadline has passed (deadline is valid until end of the day)
//   const isDeadlinePassed = moment().isAfter(moment(deadline).endOf("day"));
//   const daysUntilDeadline = moment(deadline)
//     .startOf("day")
//     .diff(moment().startOf("day"), "days");

//   useEffect(() => {
//     fetchJob();
//   }, [id]);

//   useEffect(() => {
//     if (jobData && userApplications.length > 0) {
//       checkAlreadyApplied();
//     }
//   }, [jobData, userApplications, id]);

//   return jobData ? (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50">
//         <div className="container px-4 2xl:px-20 mx-auto py-8">
//           {/* Main Job Header Card */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
//             {/* Header Section with Company Info */}

//             <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
//               <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
//                   <div className="bg-white p-1 rounded-full shadow-sm">
//                     <img
//                       className="h-20 w-20 rounded-full object-cover"
//                       src={jobData.companyId.image}
//                       alt={`${jobData.companyId.name} Logo`}
//                     />
//                   </div>
//                   <div className="text-white">
//                     <h1 className="text-2xl lg:text-3xl font-bold mb-2">
//                       {jobData.title}
//                     </h1>
//                     <p className="text-gray-200 text-lg font-medium mb-3">
//                       {jobData.companyId.name}
//                     </p>
//                     <div className="flex flex-wrap gap-4 text-sm">
//                       <span className="flex items-center border-1  border-gray-600 gap-2 bg-gray-700/50 px-3 py-1 rounded-full">
//                         <img
//                           src={assets.location_icon}
//                           alt=""
//                           className="w-4 h-4"
//                         />
//                         {jobData.location}
//                       </span>
//                       <span className="flex items-center border-1  border-gray-600 gap-2 bg-gray-700/50 px-3 py-1 rounded-full">
//                         <img
//                           src={assets.person_icon}
//                           alt=""
//                           className="w-4 h-4"
//                         />
//                         {jobData.level}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Apply Button Section */}
//                 <div className="flex flex-col items-end gap-3">
//                   <button
//                     onClick={applyHandler}
//                     disabled={isAlreadyApplied || isDeadlinePassed}
//                     className={`px-8 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
//                       isAlreadyApplied
//                         ? "border-1 border-green-500  text-green-600 cursor-not-allowed"
//                         : isDeadlinePassed
//                         ? "bg-red-600 text-white cursor-not-allowed"
//                         : "bg-white text-gray-800 hover:bg-gray-100 shadow-md hover:shadow-lg"
//                     }`}
//                   >
//                     {isAlreadyApplied
//                       ? "Already Applied"
//                       : isDeadlinePassed
//                       ? "Deadline Passed"
//                       : !isSignedIn
//                       ? "Sign in to Apply"
//                       : "Apply Now"}
//                   </button>
//                   <p className="text-gray-300 text-xs">
//                     Posted {moment(jobData.date).fromNow()}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Job Details Grid */}
//             <div className="px-8 py-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Salary Info */}
//                 <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
//                   <div className="flex items-center gap-3">
//                     <div className="bg-emerald-100 p-2 rounded-lg">
//                       <img src={assets.money_icon} alt="" className="w-5 h-5" />
//                     </div>
//                     <div>
//                       <p className="text-emerald-600 font-semibold text-lg">
//                         {kconvert.convertTo(jobData.salary * 12)}
//                       </p>
//                       <p className="text-emerald-700 text-sm">Annual CTC</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Deadline Info */}
//                 <div
//                   className={`${
//                     isDeadlinePassed
//                       ? "bg-red-50 border-red-200"
//                       : daysUntilDeadline <= 7
//                       ? "bg-orange-50 border-orange-200"
//                       : "bg-blue-50 border-blue-200"
//                   } border rounded-xl p-4`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div
//                       className={`${
//                         isDeadlinePassed
//                           ? "bg-red-100"
//                           : daysUntilDeadline <= 7
//                           ? "bg-orange-100"
//                           : "bg-blue-100"
//                       } p-2 rounded-lg`}
//                     >
//                       <svg
//                         className={`w-5 h-5 ${
//                           isDeadlinePassed
//                             ? "text-red-600"
//                             : daysUntilDeadline <= 7
//                             ? "text-orange-600"
//                             : "text-blue-600"
//                         }`}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                         />
//                       </svg>
//                     </div>
//                     <div>
//                       <p
//                         className={`${
//                           isDeadlinePassed
//                             ? "text-red-600"
//                             : daysUntilDeadline <= 7
//                             ? "text-orange-600"
//                             : "text-blue-600"
//                         } font-semibold`}
//                       >
//                         {isDeadlinePassed
//                           ? "Deadline Passed"
//                           : daysUntilDeadline === 0
//                           ? "Today"
//                           : daysUntilDeadline === 1
//                           ? "Tomorrow"
//                           : `${daysUntilDeadline} days left`}
//                       </p>
//                       <p
//                         className={`${
//                           isDeadlinePassed
//                             ? "text-red-700"
//                             : daysUntilDeadline <= 7
//                             ? "text-orange-700"
//                             : "text-blue-700"
//                         } text-sm`}
//                       >
//                         {moment(deadline).format("MMM DD, YYYY")}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Application Status */}
//                 <div
//                   className={`${
//                     isAlreadyApplied
//                       ? "bg-green-50 border-green-200"
//                       : "bg-gray-50 border-gray-200"
//                   } border rounded-xl p-4`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div
//                       className={`${
//                         isAlreadyApplied ? "bg-green-100" : "bg-gray-100"
//                       } p-2 rounded-lg`}
//                     >
//                       <svg
//                         className={`w-5 h-5 ${
//                           isAlreadyApplied ? "text-green-600" : "text-gray-600"
//                         }`}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d={
//                             isAlreadyApplied
//                               ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                               : "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                           }
//                         />
//                       </svg>
//                     </div>
//                     <div>
//                       <p
//                         className={`${
//                           isAlreadyApplied ? "text-green-600" : "text-gray-600"
//                         } font-semibold`}
//                       >
//                         {isAlreadyApplied ? "Applied" : "Not Applied"}
//                       </p>
//                       <p
//                         className={`${
//                           isAlreadyApplied ? "text-green-700" : "text-gray-700"
//                         } text-sm`}
//                       >
//                         Application Status
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Job Description - Left Column */}
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                 <div className="flex items-center gap-3 mb-6">
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Job Description
//                   </h2>
//                   <div className="h-1 bg-blue-600 rounded-full flex-1 max-w-20"></div>
//                 </div>

//                 <div
//                   className="prose prose-gray max-w-none"
//                   dangerouslySetInnerHTML={{ __html: jobData.description }}
//                 ></div>

//                 {/* Second Apply Button */}
//                 <div className="mt-8 pt-6 border-t border-gray-200">
//                   <button
//                     onClick={applyHandler}
//                     disabled={isAlreadyApplied || isDeadlinePassed}
//                     className={`w-full sm:w-auto px-8 py-2 rounded-lg font-semibold transition-all duration-200 ${
//                       isAlreadyApplied
//                         ? "bg-green-500 text-white cursor-not-allowed"
//                         : isDeadlinePassed
//                         ? "bg-red-500 text-white cursor-not-allowed"
//                         : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
//                     }`}
//                   >
//                     {isAlreadyApplied
//                       ? "✓ Already Applied"
//                       : isDeadlinePassed
//                       ? "⚠ Deadline Passed"
//                       : !isSignedIn
//                       ? "🔐 Sign in to Apply"
//                       : "Apply for this Position"}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* More Jobs Sidebar - Right Column */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-4">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6">
//                   More from {jobData.companyId.name}
//                 </h3>

//                 {(() => {
//                   const companyJobs = jobs.filter(
//                     (job) =>
//                       job._id !== jobData._id &&
//                       job.companyId._id === jobData.companyId._id
//                   );

//                   if (companyJobs.length === 0) {
//                     return (
//                       <div className="text-center py-8">
//                         <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                           <svg
//                             className="w-8 h-8 text-blue-500"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6.341"
//                             />
//                           </svg>
//                         </div>
//                         <h4 className="font-semibold text-gray-800 mb-2">
//                           That's all from {jobData.companyId.name}
//                         </h4>
//                         <p className="text-gray-600 text-sm mb-4">
//                           No other positions available from this company.
//                         </p>
//                         <button
//                           onClick={() => {
//                             navigate("/");
//                             setTimeout(() => {
//                               const element =
//                                 document.getElementById("job-list");
//                               if (element) {
//                                 element.scrollIntoView({ behavior: "smooth" });
//                               }
//                             }, 100);
//                           }}
//                           className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 mx-auto"
//                         >
//                           Explore all jobs
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M13 7l5 5m0 0l-5 5m5-5H6"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     );
//                   }

//                   const appliedJobsIds = new Set(
//                     userApplications.map((app) => app.jobId && app.jobId._id)
//                   );

//                   const availableJobs = companyJobs.filter((job) => {
//                     return !appliedJobsIds.has(job._id);
//                   });

//                   if (availableJobs.length === 0) {
//                     return (
//                       <div className="text-center py-8">
//                         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                           <svg
//                             className="w-8 h-8 text-green-500"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                           </svg>
//                         </div>
//                         <h4 className="font-semibold text-gray-800 mb-2">
//                           All Applied!
//                         </h4>
//                         <p className="text-gray-600 text-sm mb-4">
//                           You've applied to all positions from{" "}
//                           {jobData.companyId.name}.
//                         </p>
//                         <button
//                           onClick={() => {
//                             navigate("/");
//                             setTimeout(() => {
//                               const element =
//                                 document.getElementById("job-list");
//                               if (element) {
//                                 element.scrollIntoView({ behavior: "smooth" });
//                               }
//                             }, 100);
//                           }}
//                           className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1 mx-auto"
//                         >
//                           Explore more jobs
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M13 7l5 5m0 0l-5 5m5-5H6"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     );
//                   }

//                   return (
//                     <div className="space-y-4">
//                       {availableJobs.slice(0, 2).map((job, index) => (
//                         <JobCard job={job} key={index} />
//                       ))}
//                     </div>
//                   );
//                 })()}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   ) : (
//     <LadakhiLoadingAnimation />
//   );
// };

// export default ApplyJob;
