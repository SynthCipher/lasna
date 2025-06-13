import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  // Use deadline from database instead of hardcoded
  const deadline = job.deadlineDate;

  // Fixed function to check if deadline has passed - now properly handles "today"
  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const today = new Date();

    // Set both dates to midnight to compare only the date part
    deadlineDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return deadlineDate < today; // Now it only expires AFTER the deadline day
  };

  // Calculate days remaining
  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(deadline);

  return (
    <div className="bg-white/50 border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
      {/* Urgent Deadline Banner - Top of Card */}
      {deadline && !isDeadlinePassed(deadline) && (
        <div
          className={`absolute top-0 left-0 right-0 px-4 py-2.5 text-center text-sm font-bold text-white ${
            daysRemaining <= 1
              ? "bg-gradient-to-r from-red-500 via-red-600 to-red-700 animate-pulse shadow-lg"
              : daysRemaining <= 3
              ? "bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 shadow-md"
              : daysRemaining <= 7
              ? "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 shadow-md"
              : "bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            {daysRemaining === 0
              ? "⚡ DEADLINE TODAY "
              : daysRemaining === 1
              ? "⚡ DEADLINE TOMORROW "
              : daysRemaining <= 3
              ? `🔥 ONLY ${daysRemaining} DAYS LEFT `
              : daysRemaining <= 7
              ? `⏰ ${daysRemaining} DAYS LEFT TO APPLY`
              : ` Apply by ${new Date(deadline).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}`}
          </div>
        </div>
      )}

      {/* Expired Banner */}
      {deadline && isDeadlinePassed(deadline) && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 px-4 py-2.5 text-center text-sm font-bold text-white shadow-md">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            APPLICATION DEADLINE EXPIRED
          </div>
        </div>
      )}

      {/* Add top margin when banner is present */}
      <div className={deadline ? "mt-8" : ""}>
        {/* Company Logo and Header */}
        <div className="flex items-start gap-4 mb-4">
          <img
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
            src={job.companyId.image}
            alt={job.companyId.name || "Company"}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              {job.companyId.name || "Company"}
            </p>
          </div>
        </div>

        {/* Job Details */}
        <div className="flex flex-wrap gap-2 mb-4">
        
          {/* Location */}
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
            <svg
              className="w-3 h-3 mr-1.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {job.location}
          </span>

          {/* Category */}
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
            <svg
              className="w-3 h-3 mr-1.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {job.category}
          </span>

       
          
          {/* Job Type */}
          {job.jobType && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
              <svg
                className="w-3 h-3 mr-1.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1).replace('-', ' ')}
            </span>
          )}
        </div>

        {/* Skills Section */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2 font-medium">Required Skills:</p>
            <div className="flex flex-wrap gap-1">
              {job.skills.slice(0, 3).map((skill, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-200 text-gray-600">
                  +{job.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="border-b border-gray-100 mb-4"></div>

        {/* Job Description */}
        <div className="mb-5">
          <p
            className="text-gray-600 text-sm leading-relaxed line-clamp-3"
            dangerouslySetInnerHTML={{
              __html:
                job.description.slice(0, 140).replace(/<[^>]*>/g, "") + "...",
            }}
          />
        </div>

        {/* Footer with Posted Date, Salary, and Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col gap-1">
            {/* Salary */}
            {job.salary && (
              <span className="text-sm font-semibold text-green-600">
                ₹{job.salary.toLocaleString()} / month
              </span>
            )}
            {/* Posted Date */}
            {job.date && (
              <span className="text-xs text-gray-500">
                Posted{" "}
                {new Date(job.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
            {/* Deadline */}
          
          </div>

          <button
            className={`inline-flex items-center cursor-pointer px-4 py-2 text-white text-xs font-bold rounded-md ${
              isDeadlinePassed(deadline)
                ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                : daysRemaining <= 1
                ? "bg-gradient-to-r from-red-500 via-red-600 to-red-700 animate-pulse shadow-lg"
                : daysRemaining <= 3
                ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 shadow-md"
                : daysRemaining <= 7
                ? "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 shadow-md"
                : "bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700"
            }`}
            onClick={() => {
              if (!isDeadlinePassed(deadline)) {
                navigate(`/apply-job/${job._id}`);
                scrollTo(0, 0);
              }
            }}
            disabled={isDeadlinePassed(deadline)}
          >
            {isDeadlinePassed(deadline)
              ? "Expired"
              : daysRemaining <= 1
              ? "APPLY NOW!"
              : daysRemaining <= 3
              ? "APPLY TODAY"
              : "View Details"}
            {!isDeadlinePassed(deadline) && (
              <svg
                className="ml-1 w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;





// import React from "react";
// import { useNavigate } from "react-router-dom";

// const JobCard = ({ job }) => {
//   const navigate = useNavigate();

//   // Hardcoded deadline for all jobs (you can change this date)
//   const deadline = "2025-06-25"; // 13 days from today

//   // // Function to check if deadline is approaching (within 7 days)
//   // const isDeadlineApproaching = (deadline) => {
//   //   if (!deadline) return false;
//   //   const deadlineDate = new Date(deadline);
//   //   const today = new Date();
//   //   const diffTime = deadlineDate - today;
//   //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   //   return diffDays <= 7 && diffDays > 0;
//   // };

//   // Fixed function to check if deadline has passed - now properly handles "today"
//   const isDeadlinePassed = (deadline) => {
//     if (!deadline) return false;
//     const deadlineDate = new Date(deadline);
//     const today = new Date();

//     // Set both dates to midnight to compare only the date part
//     deadlineDate.setHours(0, 0, 0, 0);
//     today.setHours(0, 0, 0, 0);

//     return deadlineDate < today; // Now it only expires AFTER the deadline day
//   };

//   // Calculate days remaining
//   const getDaysRemaining = (deadline) => {
//     if (!deadline) return null;
//     const deadlineDate = new Date(deadline);
//     const today = new Date();
//     const diffTime = deadlineDate - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   const daysRemaining = getDaysRemaining(deadline);

//   return (
//     <div className="bg-white/50 border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
//       {/* Urgent Deadline Banner - Top of Card */}
//       {deadline && !isDeadlinePassed(deadline) && (
//         <div
//           className={`absolute top-0 left-0 right-0 px-4 py-2.5 text-center text-sm font-bold text-white ${
//             daysRemaining <= 1
//               ? "bg-gradient-to-r from-red-500 via-red-600 to-red-700 animate-pulse shadow-lg"
//               : daysRemaining <= 3
//               ? "bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 shadow-md"
//               : daysRemaining <= 7
//               ? "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 shadow-md"
//               : "bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 shadow-sm"
//           }`}
//         >
//           <div className="flex items-center justify-center gap-2">
//             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             {daysRemaining === 0
//               ? "⚡ DEADLINE TODAY "
//               : daysRemaining === 1
//               ? "⚡ DEADLINE TOMORROW "
//               : daysRemaining <= 3
//               ? `🔥 ONLY ${daysRemaining} DAYS LEFT `
//               : daysRemaining <= 7
//               ? `⏰ ${daysRemaining} DAYS LEFT TO APPLY`
//               : ` Apply by ${new Date(deadline).toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                 })}`}
//           </div>
//         </div>
//       )}

//       {/* Expired Banner */}
//       {deadline && isDeadlinePassed(deadline) && (
//         <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 px-4 py-2.5 text-center text-sm font-bold text-white shadow-md">
//           <div className="flex items-center justify-center gap-2">
//             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             APPLICATION DEADLINE EXPIRED
//           </div>
//         </div>
//       )}

//       {/* Add top margin when banner is present */}
//       <div className={deadline ? "mt-8" : ""}>
//         {/* Company Logo and Header */}
//         <div className="flex items-start gap-4 mb-4">
//           <img
//             className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
//             src={job.companyId.image}
//             alt={job.companyId.name || "Company"}
//           />
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
//               {job.title}
//             </h3>
//             <p className="text-sm text-gray-600 font-medium">
//               {job.companyId.name || "Company"}
//             </p>
//           </div>
//         </div>

//         {/* Job Details */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
//             <svg
//               className="w-3 h-3 mr-1.5"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             {job.location}
//           </span>
//           <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
//             <svg
//               className="w-3 h-3 mr-1.5"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             {job.level}
//           </span>
//           {job.jobType && (
//             <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-200 text-gray-900 border border-gray-400">
//               <svg
//                 className="w-3 h-3 mr-1.5"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               {job.jobType}
//             </span>
//           )}
//         </div>

//         <div className="border-b border-gray-100 mb-4"></div>

//         {/* Job Description */}
//         <div className="mb-5">
//           <p
//             className="text-gray-600 text-sm leading-relaxed line-clamp-3"
//             dangerouslySetInnerHTML={{
//               __html:
//                 job.description.slice(0, 140).replace(/<[^>]*>/g, "") + "...",
//             }}
//           />
//         </div>

//         {/* Footer with Posted Date and Action */}
//         <div className="flex items-center justify-between pt-2">
//           <div className="flex flex-col gap-1">
//             {job.date && (
//               <span className="text-xs text-gray-500">
//                 Posted{" "}
//                 {new Date(job.date).toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                 })}
//               </span>
//             )}
//           </div>

//           <button
//             className={`inline-flex items-center cursor-pointer px-4 py-2 text-white text-xs font-bold rounded-md ${
//               isDeadlinePassed(deadline)
//                 ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
//                 : daysRemaining <= 1
//                 ? "bg-gradient-to-r from-red-500 via-red-600 to-red-700 animate-pulse shadow-lg"
//                 : daysRemaining <= 3
//                 ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 shadow-md"
//                 : daysRemaining <= 7
//                 ? "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 shadow-md"
//                 : "bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700"
//             }`}
//             onClick={() => {
//               if (!isDeadlinePassed(deadline)) {
//                 navigate(`/apply-job/${job._id}`);
//                 scrollTo(0, 0);
//               }
//             }}
//             disabled={isDeadlinePassed(deadline)}
//           >
//             {isDeadlinePassed(deadline)
//               ? "Expired"
//               : daysRemaining <= 1
//               ? "APPLY NOW!"
//               : daysRemaining <= 3
//               ? "APPLY TODAY"
//               : "View Details"}
//             {!isDeadlinePassed(deadline) && (
//               <svg
//                 className="ml-1 w-3 h-3"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobCard;
