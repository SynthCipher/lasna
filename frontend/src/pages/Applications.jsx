import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const { user } = useUser();
  const { getToken } = useAuth();

  const navigate = useNavigate();
  const {
    backendUrl,
    userData,
    userApplications,
    fectchUserData,
    fetchUserApplications,
  } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/users/update-resume",
        formData,
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        await fectchUserData();
      } else {
        toast.error(data.message);
      }
      setIsEdit(false);
      setResume(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Interview":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  useEffect(() => {
    if (user) {
      console.log(userData);
      fetchUserApplications();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-medium">Your Resume</h2>
        {/* <div className="flex gap-2 mb-6 mt-3">
          {isEdit || (userData && userData.resume === "") ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  type="file"
                  hidden
                  accept="application/pdf"
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button
                onClick={updateResume}
                className="bg-green-100   cursor-pointer border border-green-400 rounded-lg px-4 py-2"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                href={userData?.resume}
                target="_blank"
              >
                {userData?.resume ? "View Resume" : "Upload Resume"}
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div> */}

        <div className="mb-6 mt-3">
          {isEdit || (userData && userData.resume === "") ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 transition-all hover:border-blue-400 hover:bg-blue-50/30">
              {/* Upload Section */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                  <label
                    className="group cursor-pointer flex items-center justify-center w-full"
                    htmlFor="resumeUpload"
                  >
                    <div className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 hover:shadow-md transition-all group-hover:bg-blue-50/50 w-full sm:w-auto">
                      {/* File Icon */}
                      <div className="flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
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
                      </div>

                      {/* File Name/Status */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors truncate">
                          {resume ? resume.name : "Choose Resume File"}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {resume
                            ? `${(resume.size / 1024 / 1024).toFixed(2)} MB`
                            : "PDF files only, max 10MB"}
                        </p>
                      </div>

                      {/* Upload Icon */}
                      <div className="flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                    </div>

                    <input
                      id="resumeUpload"
                      onChange={(e) => setResume(e.target.files[0])}
                      type="file"
                      hidden
                      accept="application/pdf"
                    />
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={updateResume}
                    disabled={!resume}
                    className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium px-5 py-1 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
                  >
                    <span>Save</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsEdit(false);
                      setResume(null);
                    }}
                    className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-1 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Progress or Status */}
              {resume && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-green-600"
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
                    <span className="text-sm text-green-700 font-medium">
                      Ready to upload
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Resume Info */}
                {/* <div className="flex items-center space-x-4   flex-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0  ">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Resume
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {userData?.resume
                        ? "Your current resume file"
                        : "No resume uploaded yet"}
                    </p>
                  </div>
                </div> */}
                {/* Resume Info */}
                <div className="w-full sm:flex-1">
                  <div className="flex items-center justify-between sm:justify-start space-x-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>

                    {/* Resume Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Resume
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {userData?.resume
                          ? "Your current resume file"
                          : "No resume uploaded yet"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full sm:w-auto">
                  {userData?.resume && (
                    <a
                      className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md text-center decoration-none"
                      href={userData.resume}
                      target="_blank"
                      rel="noopener noreferrer"
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>View Resume</span>
                    </a>
                  )}

                  <button
                    onClick={() => setIsEdit(true)}
                    className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-1 text-sm rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 flex items-center justify-center space-x-2"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>{userData?.resume ? "Update" : "Upload"}</span>
                  </button>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      userData?.resume ? "bg-green-400" : "bg-yellow-400"
                    }`}
                  ></div>
                  <span
                    className={`text-xs font-medium ${
                      userData?.resume ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {userData?.resume ? "Resume uploaded" : "Resume required"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {userApplications.length > 0 && (
          <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        )}

        {/* Desktop Table View */}
        <div className="hidden sm:block">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                    Company
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                    Job Title
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 max-md:hidden">
                    Location
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 max-md:hidden">
                    Date Applied
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userApplications.reverse().map((job, index) =>
                  true ? (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg  flex items-center justify-center overflow-hidden">
                            <img
                              className="w-10 h-10 rounded-full border-gray-100 border-2 object-cover"
                              src={job.companyId.image}
                              alt="company logo"
                            />
                          </div>
                          <span className="font-medium text-gray-900">
                            {job.companyId.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700 font-medium">
                        {job.jobId.title}
                      </td>
                      <td className="py-4 px-6 text-gray-600 max-md:hidden">
                        {job.jobId.location}
                      </td>
                      <td className="py-4 px-6 text-gray-600 max-md:hidden">
                        {moment(job.date).format("MMM DD, YYYY")}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-4">
          {userApplications.map((job, index) =>
            true ? (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                {/* Header with company and status */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg  flex items-center justify-center overflow-hidden">
                      <img
                        className="w-12 h-12 rounded-full border-gray-100 border-2 object-cover"
                        src={job.companyId.image}
                        alt="company logo"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {job.companyId.name}
                      </h3>
                      <p className="text-gray-600 text-xs">
                        {moment(job.date).format("MMM DD, YYYY")}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </div>

                {/* Job details */}
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                      Position
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {job.jobId.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                      Location
                    </p>
                    <p className="text-sm text-gray-700">
                      {job.jobId.location}
                    </p>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>

        {/* Empty state */}
        {userApplications.length === 0 && (
          <div
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                const jobListSection = document.getElementById("job-list");
                if (jobListSection) {
                  jobListSection.scrollIntoView({ behavior: "smooth" });
                }
              }, 100);
            }}
            className="text-center py-12 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors group"
          >
            <div className="w-24 h-24 mx-auto bg-gray-100 group-hover:bg-blue-50 rounded-full flex items-center justify-center mb-4 transition-colors">
              <svg
                className="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5M16 6H8m0 0v10.5a2 2 0 002 2h4a2 2 0 002-2V16.5"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
              No Applications Yet
            </h3>
            <p className="text-gray-600 group-hover:text-blue-700 transition-colors mb-3">
              Start applying to jobs to see your applications here.
            </p>
            <div className="inline-flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
              Browse Jobs
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Applications;

// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { assets, jobsApplied } from "../assets/assets";
// import moment from "moment";

// const Applications = () => {
//   const [isEdit, setIsEdit] = useState(false);
//   const [resume, setResume] = useState(null);
//   useEffect(() => {
//     console.log(resume);
//   }, [resume]);
//   return (
//     <>
//       <Navbar />
//       <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
//         <h2 className="text-xl font-medium">Your Resume</h2>
//         <div className="flex gap-2  mb-6 mt-3">
//           {isEdit ? (
//             <>
//               <label className="flex items-center" htmlFor="resumeUpload">
//                 <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
//                   Select Resume{" "}
//                 </p>
//                 <input
//                   id="resumeUpload"
//                   onChange={(e) => setResume(e.target.files[0])}
//                   type="file"
//                   hidden
//                   accept="application/pdf"
//                 />
//                 <img src={assets.profile_upload_icon} alt="" />
//               </label>
//               <button
//                 onClick={(e) => setIsEdit(false)}
//                 className="bg-green-100 border border-green-400 rounded-lg px-4 py-2"
//               >
//                 Save
//               </button>
//             </>
//           ) : (
//             <div className="flex gap-2">
//               <a
//                 className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
//                 href=""
//               >
//                 Resume
//               </a>
//               <button
//                 onClick={() => setIsEdit(true)}
//                 className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
//               >
//                 Edit
//               </button>
//             </div>
//           )}
//         </div>

//         <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg">
//           <thead>
//             <tr>
//               <th className="py-3 px-4 border-b border-gray-300 text-left">
//                 Company
//               </th>
//               <th className="py-3 px-4 border-b border-gray-300 text-left">
//                 Job Title
//               </th>
//               <th className="py-3 px-4 border-b border-gray-300 text-left max-sm:hidden">
//                 Location
//               </th>
//               <th className="py-3 px-4 border-b border-gray-300 text-left max-sm:hidden">
//                 Date
//               </th>
//               <th className="py-3 px-4 border-b border-gray-300 text-left">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobsApplied.map((job, index) =>
//               true ? (
//                 <tr key={index}>
//                   <td className="py-3 px-4 flex items-center gap-2 border-gray-300 border-b">
//                     <img className="w-8 h-8" src={job.logo} alt="" />
//                     {job.company}
//                   </td>
//                   <td className="py-3 px-4 border-b border-gray-300">
//                     {job.title}
//                   </td>
//                   <td className="py-3 px-4 border-b border-gray-300 max-sm:hidden">
//                     {job.location}
//                   </td>
//                   <td className="py-3 px-4 border-b border-gray-300 max-sm:hidden">
//                     {moment(job.date).format("ll")}
//                   </td>
//                   <td className="py-3 px-4 border-b border-gray-300">
//                     <span
//                       className={` ${
//                         job.status === "Accepted"
//                           ? "bg-green-100"
//                           : job.status === "Rejected"
//                           ? "bg-red-100"
//                           : "bg-blue-100"
//                       } px-4 py-1.5 rounded`}
//                     >
//                       {job.status}
//                     </span>
//                   </td>
//                 </tr>
//               ) : null
//             )}
//           </tbody>
//         </table>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Applications;
