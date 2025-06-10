import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplication = () => {
  // Mock data for styling purposes

  return (
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
          {viewApplicationsPageData.map((application, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={application.imgSrc}
                  alt={application.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-800 mb-1">
                    {application.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-1">
                    {application.jobTitle}
                  </p>
                </div>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                  #{index + 1}
                </span>
              </div>
              <p className="text-slate-500 text-sm my-2 flex items-center">
                <span className="mr-1">
                  <img src={assets.location_icon} className="h-4 w-4" alt="" />
                </span>
                {application.location}
              </p>

              <div className="border-t border-slate-100 pt-4">
                <a
                  href="https://vercel.com/jigmatdorjeys-projects"
                  target="_blank"
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg mb-3 transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="mr-2">📄</span>
                  View Resume
                </a>

                {/* Status/Action Dropdown - Mobile Styled */}
                <div className="relative ">
                  <select className="w-full bg-white border border-slate-300 text-slate-800 py-3 px-4 rounded-xl transition-all duration-200 shadow-sm focus:ring-2  focus:ring-blue-500 focus:outline-none font-medium appearance-none cursor-pointer">
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
                {viewApplicationsPageData.map((application, index) => (
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
                          src={application.imgSrc}
                          alt={application.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-slate-200  max-lg:hidden"
                        />
                        <div className="font-medium text-slate-800">
                          {application.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {application.jobTitle}
                    </td>
                    <td className="px-6 py-4  text-sm text-slate-600 max-lg:hidden flex items-center">
                   
                      {application.location}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="https://vercel.com/jigmatdorjeys-projects"
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
                        <select className="w-full bg-white border border-slate-300 text-slate-800 py-2 px-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 font-medium appearance-none cursor-pointer">
                          <option value="pending" className="text-yellow-600">
                            🕒 Pending
                          </option>
                          <option value="Accepted" className="text-green-600">
                            ✅ Accept
                          </option>
                          <option value="Rejected" className="text-red-600">
                            ❌ Reject
                          </option>
                          <option value="Interview" className="text-purple-600">
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
  );
};

export default ViewApplication;
