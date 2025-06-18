import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import LadakhiLoadingAnimation from "../components/LadakhiLoadingAnimation";
import LoadingApplication from "../components/LoadingApplication";
import { useNavigate } from "react-router-dom";

const ViewApplication = () => {
  // Mock data for styling purposes
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState(false);

  // functionto fetch company job appliatn data
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
        headers: { authorization: companyToken },
      });
      if (data.success) {
        console.log(data.applications);
        setApplicants(data.applications.reverse());
        console.log(applicants);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // function to update job application status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        { id, status },
        {
          headers: { authorization: companyToken },
        }
      );
      if (data.success) {
        fetchCompanyJobApplications();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  return applicants ? (
    applicants.length === 0 ? (
      <div className="min-h-screen p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
              Job Applications
            </h1>
            <p className="text-slate-600 text-sm md:text-base">
              Manage and review candidate applications
            </p>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-8 md:py-16 ">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 lg:p-12 max-w-md w-full text-center">
              {/* Icon */}
              <div className="mb-4 md:mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2 md:mb-3">
                No Applications Yet
              </h3>

              {/* Description */}
              <p className="text-slate-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                You haven't received any job applications yet. Once candidates
                start applying to your job postings, they'll appear here for you
                to review and manage.
              </p>

              {/* Action Button */}
              <button
                onClick={() => navigate("/dashboard/add-job")}
                className="w-full cursor-pointer md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center mx-auto text-sm md:text-base"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Post a New Job
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="min-h-screen md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Job Applications
            </h1>
            <p className="text-slate-600">
              Manage and review candidate applications
            </p>
          </div>

          {/* Applications Grid - Mobile First */}
          <div className="block md:hidden space-y-4">
            {applicants
              .filter((item) => item.jobId && item.userId)
              .map((applicant, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={applicant.userId.image}
                      alt="applicant profile pic"
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-slate-800 mb-1">
                        {applicant.userId.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-1">
                        {applicant.jobId.title}
                      </p>
                    </div>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                      #{index + 1}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm my-2 flex items-center">
                    <span className="mr-1">
                      <img
                        src={assets.location_icon}
                        className="h-4 w-4"
                        alt=""
                      />
                    </span>
                    {applicant.jobId.location}
                  </p>

                  <div className="border-t border-slate-100 pt-4">
                    <a
                      href={applicant?.userId?.resume}
                      target="_blank"
                      className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-1 px-2 rounded-lg mb-3 transition-colors duration-200 flex items-center justify-center"
                    >
                      <span className="mr-2">📄</span>
                      View Resume
                    </a>

                    {/* Status/Action Dropdown - Mobile Styled */}
                    <div className="relative ">
                      <select
                        defaultValue={applicant.status} // or set value={status} if controlled
                        onChange={(e) =>
                          changeJobApplicationStatus(
                            applicant._id,
                            e.target.value
                          )
                        }
                        className="w-full bg-white border border-slate-300 text-slate-800 py-1 px-2 rounded-xl transition-all duration-200 shadow-sm focus:ring-2  focus:ring-blue-500 focus:outline-none font-medium text-sm appearance-none cursor-pointer"
                      >
                        <option value="Pending">📋 Pending Review</option>
                        <option value="Accepted">✅ Accept</option>
                        <option value="Rejected">❌ Reject</option>
                        <option value="Interview">📞 Schedule Interview</option>
                      </select>

                      {/* Custom dropdown arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-slate-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Profile
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Job Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700  max-lg:hidden">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Resume
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Status/Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applicants
                    .filter((item) => item.jobId && item.userId)
                    .map((applicant, index) => (
                      <tr
                        key={index}
                        className="hover:bg-slate-50 transition-colors  duration-150"
                      >
                        <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={applicant.userId.image}
                              alt="applicants profile pic"
                              className="w-10 h-10 rounded-full object-cover border-2 border-slate-200  max-lg:hidden"
                            />
                            <div className="font-medium text-slate-800">
                              {applicant.userId.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {applicant.jobId.title}
                        </td>
                        <td className="px-6 py-4  text-sm text-slate-600 max-lg:hidden flex items-center">
                          {applicant.jobId.location}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={applicant?.userId?.resume}
                            target="_blank"
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm transition-colors duration-200 flex items-center"
                          >
                            <span className="mr-1">📄</span>
                            Resume
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          {/* Status/Action Dropdown */}
                          <div className="relative">
                            <select
                              defaultValue={applicant.status} // or set value={status} if controlled
                              onChange={(e) =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  e.target.value
                                )
                              }
                              className="w-full bg-white border border-slate-300 text-slate-800 py-1 px-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 font-medium text-sm appearance-none cursor-pointer"
                            >
                              <option
                                value="pending"
                                className="text-yellow-600"
                              >
                                🕒 Pending
                              </option>
                              <option
                                value="Accepted"
                                className="text-green-600"
                              >
                                ✅ Accept
                              </option>
                              <option value="Rejected" className="text-red-600">
                                ❌ Reject
                              </option>
                              <option
                                value="Interview"
                                className="text-purple-600"
                              >
                                📞 Interview
                              </option>
                            </select>

                            {/* Custom arrow */}
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                              <svg
                                className="w-4 h-4 text-slate-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <LoadingApplication />
  );
};

export default ViewApplication;
