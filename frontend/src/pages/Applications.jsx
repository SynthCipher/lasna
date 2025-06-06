import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(resume);
  }, [resume]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-medium">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  Select Resume{" "}
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
                onClick={(e) => setIsEdit(false)}
                className="bg-green-100 border border-green-400 rounded-lg px-4 py-2"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                href=""
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>

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
                {jobsApplied.map((job, index) =>
                  true ? (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img
                              className="w-8 h-8 object-cover"
                              src={job.logo}
                              alt={job.company}
                            />
                          </div>
                          <span className="font-medium text-gray-900">
                            {job.company}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700 font-medium">
                        {job.title}
                      </td>
                      <td className="py-4 px-6 text-gray-600 max-md:hidden">
                        {job.location}
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
          {jobsApplied.map((job, index) =>
            true ? (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                {/* Header with company and status */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        className="w-10 h-10 object-cover"
                        src={job.logo}
                        alt={job.company}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {job.company}
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
                      {job.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                      Location
                    </p>
                    <p className="text-sm text-gray-700">{job.location}</p>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>

        {/* Empty state */}
        {jobsApplied.length === 0 && (
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
