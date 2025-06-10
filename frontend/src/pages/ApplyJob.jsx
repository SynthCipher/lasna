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
import { useAuth } from "@clerk/clerk-react";

const ApplyJob = () => {
  const { id } = useParams();

  const { getToken } = useAuth();

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
   *
   * - Checks if the user is logged in; prompts login if not.
   * - Ensures the user has uploaded a resume before applying.
   * - Sends a POST request to apply for the specified job.
   * - Displays success or error notifications based on the response.
   * - Fetches updated user applications on successful application.
   */
  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error("login to apply for job.");
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
      toast.error(error.message);
    }
  };

  /**
   * Checks if the current user has already applied to the specified job.
   * Iterates through the user's applications and compares each application's job ID
   * with the current job's ID. Updates the `isAlreadyApplied` state accordingly.
   */
  const checkAlreadyApplied = () => {
    const hasAppplied = userApplications.some(
      (item) => item.jobId._id === jobData._id
    );
    setIsAlreadyApplied(hasAppplied);
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
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 border bg-sky-50 border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border border-gray-200"
                src={jobData.companyId.image}
                alt="REcruiter Logo"
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-medium">
                  {jobData.title}
                </h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6  items-center text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" />
                    CTC : {kconvert.convertTo(jobData.salary * 12)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button
                onClick={applyHandler}
                className="bg-blue-600 p-2.5 cursor-pointer text-white px-10 rounded"
              >
                {isAlreadyApplied ? "Already Applied" : "Apply Now"}
              </button>
              <p className="mt-1 text-gray-600">
                Posted {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job description</h2>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              ></div>
              <button
                onClick={applyHandler}
                className="bg-blue-600 p-2.5 cursor-pointer  text-white px-10 rounded mt-10"
              >
                {isAlreadyApplied ? "Already Applied" : "Apply Now"}
              </button>
            </div>
            {/* Right section more JObs */}
            {/* <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5 ">
              <h2 className="text-2xl">
                More Job from {jobData.companyId.name}
              </h2>

              {jobs.filter(
                (job) =>
                  job._id !== jobData._id &&
                  job.companyId._id === jobData.companyId._id
              ).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200 shadow-sm">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                    That's all from {jobData.companyId.name}
                  </h3>
                  <p className="text-gray-600 text-sm text-center max-w-sm">
                    We've shown you all available positions from this company.
                    Check out other opportunities below!
                  </p>
                  <div
                    onClick={() => {
                      navigate("/");
                      setTimeout(() => {
                        const element = document.getElementById("job-list");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }, 100);
                    }}
                    className="mt-4 flex items-center cursor-pointer text-blue-600 text-sm font-medium"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
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
                    Explore more jobs
                  </div>
                </div>
              ) : (
                jobs
                  .filter(
                    (job) =>
                      job._id !== jobData._id &&
                      job.companyId._id === jobData.companyId._id
                  )
                  .filter((job) => {
                    // set fo applied jobIds
                    const appliedJobsIds = new Set(
                      userApplications.map((app) => app.jobId && app.jobId._id)
                    );
                    // return true if user is not applied for this job
                    return !appliedJobsIds.has(job._id);
                  })
                  .slice(0, 2)
                  .map((job, index) => <JobCard job={job} key={index} />)
              )}
            </div> */}

            {/* Right section more Jobs */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2 className="text-2xl">
                More Job from {jobData.companyId.name}
              </h2>

              {(() => {
                // Get all jobs from the same company (excluding current job)
                const companyJobs = jobs.filter(
                  (job) =>
                    job._id !== jobData._id &&
                    job.companyId._id === jobData.companyId._id
                );

                // If no other jobs exist from this company
                if (companyJobs.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200 shadow-sm">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
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
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                        That's all from {jobData.companyId.name}
                      </h3>
                      <p className="text-gray-600 text-sm text-center max-w-sm">
                        We've shown you all available positions from this
                        company. Check out other opportunities below!
                      </p>
                      <div
                        onClick={() => {
                          navigate("/");
                          setTimeout(() => {
                            const element = document.getElementById("job-list");
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }, 100);
                        }}
                        className="mt-4 flex items-center cursor-pointer text-blue-600 text-sm font-medium"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
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
                        Explore more jobs
                      </div>
                    </div>
                  );
                }

                // Filter out applied jobs
                const appliedJobsIds = new Set(
                  userApplications.map((app) => app.jobId && app.jobId._id)
                );

                const availableJobs = companyJobs.filter((job) => {
                  return !appliedJobsIds.has(job._id);
                });

                // If all jobs from this company have been applied to
                if (availableJobs.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200 shadow-sm">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
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
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                        All Applied!
                      </h3>
                      <p className="text-gray-600 text-sm text-center max-w-sm">
                        You've already applied to all available positions from{" "}
                        {jobData.companyId.name}. Great job! Check out other
                        opportunities below.
                      </p>
                      <div
                        onClick={() => {
                          navigate("/");
                          setTimeout(() => {
                            const element = document.getElementById("job-list");
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }, 100);
                        }}
                        className="mt-4 flex items-center cursor-pointer text-green-600 text-sm font-medium hover:text-green-700 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
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
                        Explore more jobs
                      </div>
                    </div>
                  );
                }

                // Show available jobs (max 2)
                return availableJobs
                  .slice(0, 2)
                  .map((job, index) => <JobCard job={job} key={index} />);
              })()}
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
