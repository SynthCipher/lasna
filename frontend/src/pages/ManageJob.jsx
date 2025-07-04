import React from "react";
import { assets } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import { Eye } from "lucide-react";

const ManageJob = () => {
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext);

  const [jobs, setJobs] = useState([]);

  const fetchCompanyJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { authorization: companyToken },
      });
      if (data.success) {
        console.log(data);
        setJobs(data.jobsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // function to change the visibilty of the job
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        { id },
        { headers: { authorization: companyToken } }
      );

      if (data.success) {
        console.log(data.job);
        fetchCompanyJob();
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
      fetchCompanyJob();
    }
  }, [companyToken]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Manage Jobs</h1>
        <p className="text-gray-600 mt-1">
          View and manage all your job postings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-blue-600 text-sm font-medium">Total Jobs</div>
          <div className="text-2xl font-bold text-blue-700">{jobs.length}</div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="text-orange-600 text-sm font-medium">
            Total Applicants
          </div>
          <div className="text-2xl font-bold text-orange-700">
            {jobs.reduce((sum, job) => sum + job.applicants, 0)}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Mobile View */}
        <div className="block md:hidden">
          <div className="divide-y divide-gray-200">
            {jobs.map((job, index) => (
              <div key={index} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                        #{index + 1}
                      </span>
                      <span className="text-xs text-gray-500">
                        {moment(job.date).format("ll")}
                      </span>
                    </div>
                    <h3
                      onClick={() =>
                        navigate(`/dashboard/manage-job/${job._id}`)
                      }
                      className="font-semibold cursor-pointer text-gray-900 mb-1"
                    >
                      {job.title}
                    </h3>
                    <div
                      onClick={() =>
                        navigate(`/dashboard/manage-job/${job._id}`)
                      }
                      className="flex cursor-pointer items-center gap-4 text-sm text-gray-600 "
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            Applicants:
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                            {job.applicants}
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            navigate(`/dashboard/manage-job/${job._id}`)
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={job.visible !== false}
                        className="sr-only peer"
                        onChange={() => changeJobVisibility(job._id)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <span className="text-xs text-gray-500">Visible</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date Posted
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-lg:hidden">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Applicants
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Visible
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm px-2 py-1 rounded-full font-medium">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      onClick={() =>
                        navigate(`/dashboard/manage-job/${job._id}`)
                      }
                      className="text-sm font-medium cursor-pointer text-gray-900"
                    >
                      {job.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {moment(job.date).format("ll")}
                    </div>
                    <div className="text-xs text-gray-400">
                      {moment(job.date).fromNow()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-lg:hidden">
                    <div className="flex items-center text-sm text-gray-600 ">
                      <img
                        src={assets.location_icon}
                        className="h-3 mr-1 w-3"
                        alt=""
                      />
                      {job.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      onClick={() =>
                        navigate(`/dashboard/manage-job/${job._id}`)
                      }
                      className="flex cursor-pointer items-center"
                    >
                      <span className="text-sm font-medium text-gray-900">
                        {job.applicants}
                      </span>
                      <div className="flex items-center  text-xs md:text-sm  ml-2  cursor-pointer transition-colors duration-200">
                        <Eye className="w-4 h-4 mr-0.5" />
                        View
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={job.visible !== false}
                        className="sr-only peer"
                        onChange={() => changeJobVisibility(job._id)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {jobs.length === 0 && (
          <div
            className="text-center py-12"
            onClick={() => navigate("/dashboard/add-job")}
          >
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
              No jobs posted
            </h3>
            <button
              className="mt-6 mb-4 inline-flex items-center justify-center cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent div's click
                navigate("/dashboard/add-job");
              }}
            >
              Post Job
            </button>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first job posting.
            </p>
          </div>
        )}
      </div>

      {jobs.length !== 0 && (
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 flex it bg-black text-white rounded-md font-semibold cursor-pointer hover:bg-blue-700 transition"
            onClick={() => navigate("/dashboard/add-job")}
          >
            Add New Job
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageJob;
