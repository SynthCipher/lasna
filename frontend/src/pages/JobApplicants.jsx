import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { Mail } from "lucide-react";

const JobApplicants = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applications, setApplications] = useState([]);
  const [jobDetails, setJobDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    interview: 0,
  });

  // Fetch job applicants
  const fetchJobApplicants = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/company/job-applicants/${jobId}`,
        { headers: { authorization: companyToken } }
      );

      if (data.success) {
        setApplications(data.applications);
        setJobDetails(data.jobDetails);

        // Calculate stats
        const totalApps = data.applications.length;
        const pending = data.applications.filter(
          (app) => app.status === "Pending"
        ).length;
        const accepted = data.applications.filter(
          (app) => app.status === "Accepted"
        ).length;
        const rejected = data.applications.filter(
          (app) => app.status === "Rejected"
        ).length;
        const interview = data.applications.filter(
          (app) => app.status === "Interview"
        ).length;

        setStats({ total: totalApps, pending, accepted, rejected, interview });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Change application status
  const changeApplicationStatus = async (applicationId, newStatus) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id: applicationId, status: newStatus },
        { headers: { authorization: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchJobApplicants(); // Refresh the list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "Interview":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  useEffect(() => {
    if (companyToken && jobId) {
      fetchJobApplicants();
    }
  }, [companyToken, jobId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full cursor-pointer max-w-7xl mx-auto ">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard/manage-job")}
          className="flex cursor-pointer items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Manage Jobs
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {jobDetails.title}
          </h1>
          <div className="flex flex-wrap gap-2 md:gap-4 text-sm text-gray-600">
            <span className="flex items-center">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {jobDetails.location}, {jobDetails.district}
            </span>
            <span className="flex items-center">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {jobDetails.category}
            </span>
            {jobDetails.salary && (
              <span className="flex items-center">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                ₹{jobDetails.salary?.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
          <div className="text-blue-600 text-xs md:text-sm font-medium">
            Total Applications
          </div>
          <div className="text-xl md:text-2xl font-bold text-blue-700">
            {stats.total}
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4">
          <div className="text-yellow-600 text-xs md:text-sm font-medium">
            Pending
          </div>
          <div className="text-xl md:text-2xl font-bold text-yellow-700">
            {stats.pending}
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 md:p-4">
          <div className="text-purple-600 text-xs md:text-sm font-medium">
            Interview
          </div>
          <div className="text-xl md:text-2xl font-bold text-purple-700">
            {stats.interview}
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4">
          <div className="text-green-600 text-xs md:text-sm font-medium">
            Accepted
          </div>
          <div className="text-xl md:text-2xl font-bold text-green-700">
            {stats.accepted}
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
          <div className="text-red-600 text-xs md:text-sm font-medium">
            Rejected
          </div>
          <div className="text-xl md:text-2xl font-bold text-red-700">
            {stats.rejected}
          </div>
        </div>
      </div>

      {/* Applicants List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 ">
          <h2 className="text-lg font-semibold text-gray-900">
            Applications ({applications.length})
          </h2>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No applications yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              No one has applied for this job yet.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile View */}
            <div className="block md:hidden divide-y divide-gray-200 ">
              {applications.map((application, index) => (
                <div key={application._id} className="p-4 ">
                  <div className="flex items-center space-x-4 ">
                    {/* Profile Image */}
                    <img
                      src={application.userId?.image || "/default-avatar.png"}
                      alt={application.userId?.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        <a
                          href={`mailto:${application.userId?.email}`}
                          className="flex items-center gap-1 "
                        >
                          {application.userId?.name}
                        </a>
                      </h3>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {/* Resume Link */}
                    {application.userId?.resume && (
                      <a
                        href={application.userId.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-1  px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm font-medium"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        View Resume
                      </a>
                    )}

                    {/* Status Dropdown */}
                    <div className="relative">
                      <select
                        value={application.status}
                        onChange={(e) =>
                          changeApplicationStatus(
                            application._id,
                            e.target.value
                          )
                        }
                        className="w-full bg-white border border-gray-300 text-gray-800 py-1 px-3 text-sm rounded-lg transition-all duration-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium appearance-none cursor-pointer"
                      >
                        <option value="Pending">🕒 Pending Review</option>
                        <option value="Interview">📞 Schedule Interview</option>
                        <option value="Accepted">✅ Accept</option>
                        <option value="Rejected">❌ Reject</option>
                      </select>

                      {/* Custom dropdown arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500"
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

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Applicant
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hidden lg:table-cell">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hidden xl:table-cell">
                      Applied
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Resume
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((application, index) => (
                    <tr
                      key={application._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={
                              application.userId?.image || "/default-avatar.png"
                            }
                            alt={application.userId?.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {application.userId?.name}
                            </div>
                            {/* Show email on smaller desktop screens when email column is hidden */}
                            <div className="text-sm text-gray-500 lg:hidden">
                              <a
                                href={`mailto:${application.userId?.email}`}
                                className="text-blue-600 hover:text-blue-800 underline"
                              >
                                {application.userId?.email?.slice(0, 10)}...
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                        <a
                          href={`mailto:${application.userId?.email}`}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {application.userId?.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 hidden xl:table-cell">
                        {moment(application.createdAt).format("MMM DD, YYYY")}
                      </td>
                      <td className="px-6 py-4">
                        {application.userId?.resume ? (
                          <a
                            href={application.userId.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm transition-colors duration-200 flex items-center w-fit"
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
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            Resume
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">
                            No resume
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <select
                            value={application.status}
                            onChange={(e) =>
                              changeApplicationStatus(
                                application._id,
                                e.target.value
                              )
                            }
                            className="bg-white border border-gray-300 text-gray-800 py-1 px-2 rounded-md text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 font-medium appearance-none cursor-pointer pr-8"
                          >
                            <option value="Pending">🕒 Pending</option>
                            <option value="Interview">📞 Interview</option>
                            <option value="Accepted">✅ Accept</option>
                            <option value="Rejected">❌ Reject</option>
                          </select>

                          {/* Custom arrow */}
                          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-500"
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
          </>
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
