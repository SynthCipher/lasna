import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [district, setDistrict] = useState("");
  const [location, setLocation] = useState("Banglore");
  const [category, setCategory] = useState("Programming");
  const [experienceRequired, setExperienceRequired] = useState("entry-level");
  const [salary, setSalary] = useState(0);
  const [deadlineDate, setDeadlineDate] = useState("");
  const [jobType, setJobType] = useState("full-time");
  const [skills, setSkills] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [jobDescriptionError, setJobDescriptionError] = useState("");
  const [jobDescriptionContent, setJobDescriptionContent] = useState("");

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  const validateJobDescription = () => {
    const textContent = editorRef.current?.textContent || "";
    const cleanContent = textContent.trim();

    if (cleanContent === "" || cleanContent.length === 0) {
      setJobDescriptionError("Job Description is required");
      return false;
    }

    setJobDescriptionError("");
    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;
      if (!validateJobDescription()) {
        editorRef.current?.focus();
        return;
      }

      // Convert skills string to array
      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);

      console.log(
        title,
        description,
        district,
        location,
        salary,
        experienceRequired,
        category,
        deadlineDate,
        jobType,
        skillsArray,
        contactEmail
      );

      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        {
          title,
          description,
          district,
          location,
          salary,
          experienceRequired,
          category,
          deadlineDate,
          jobType,
          skills: skillsArray,
          contactEmail,
        },
        { headers: { authorization: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setDistrict("");
        setSalary(0);
        setDeadlineDate("");
        setSkills("");
        setContactEmail("");
        quillRef.current.root.innerHTML = "";
        navigate("/dashboard/manage-job");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">
          Create New Job Posting
        </h1>
        <p className="text-gray-600 mt-1">
          Fill in the details below to post a new job opportunity
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Job Title Section */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Job Title *
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="e.g. Senior React Developer"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Job Description Section */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Job Description *
          </label>
          <div
            className={`w-full border-2 rounded-lg overflow-hidden transition-all duration-200 ${
              jobDescriptionError
                ? "border-red-500"
                : "border-gray-200 focus-within:border-blue-500"
            }`}
          >
            <div ref={editorRef} className="min-h-[200px] bg-white"></div>
          </div>
          {jobDescriptionError && (
            <p className="text-red-500 text-sm mt-1">{jobDescriptionError}</p>
          )}
        </div>

        {/* District Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Job Location */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              District *
            </label>
            <div className="relative">
              <select
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 bg-white appearance-none cursor-pointer"
                onChange={(e) => setDistrict(e.target.value)}
                required
              >
                {JobLocations.map((location, index) => (
                  <option value={location} key={index}>
                    {location}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* Location */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Location *
            </label>
            <input
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              type="text"
              placeholder="e.g. Nubra"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Job Category */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Category *
            </label>
            <div className="relative">
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 bg-white appearance-none cursor-pointer"
                required
              >
                {JobCategories.map((category, index) => (
                  <option value={category} key={index}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Experience Required */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Experience Required
            </label>
            <div className="relative">
              <select
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 bg-white appearance-none cursor-pointer"
                onChange={(e) => setExperienceRequired(e.target.value)}
                // required
              >
                <option value="entry-level">Entry Level</option>
                <option value="mid-level">Mid Level</option>
                <option value="senior-level">Senior Level</option>
                <option value="executive">Executive</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Job Type */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Type *
            </label>
            <div className="relative">
              <select
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 bg-white appearance-none cursor-pointer"
                onChange={(e) => setJobType(e.target.value)}
                required
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="freelance">Freelance</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Salary Section */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Salary (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                ₹
              </span>
              <input
                onChange={(e) => setSalary(e.target.value)}
                value={salary}
                type="Number"
                min={0}
                className="w-full pl-7 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700"
                placeholder="25,000"
                // required
              />
            </div>
          </div>

          {/* Deadline Date */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Application Deadline *
            </label>
            <input
              onChange={(e) => setDeadlineDate(e.target.value)}
              value={deadlineDate}
              type="date"
              required
              min={
                new Date(Date.now() + 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Skills and Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Skills */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Required Skills (comma separated)
            </label>
            <input
              onChange={(e) => setSkills(e.target.value)}
              value={skills}
              type="text"
              placeholder="e.g. React, Node.js, MongoDB"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Email
            </label>
            <input
              onChange={(e) => setContactEmail(e.target.value)}
              value={contactEmail}
              type="email"
              placeholder="hr@company.com"
              // required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Create Job Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;

// import React, { useEffect, useRef, useState } from "react";
// import Quill from "quill";
// import { JobCategories, JobLocations } from "../assets/assets";
// import axios from "axios";
// import { useContext } from "react";
// import { AppContext } from "../context/AppContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const AddJob = () => {
//   const { backendUrl, companyToken } = useContext(AppContext);
//   const [title, setTitle] = useState("");
//   const [location, setLocation] = useState("Banglore");
//   const [category, setCategory] = useState("Programming");
//   const [level, setLevel] = useState("Beginner Level");
//   const [salary, setSalary] = useState(0);

//   const editorRef = useRef(null);
//   const quillRef = useRef(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!quillRef.current && editorRef.current) {
//       quillRef.current = new Quill(editorRef.current, {
//         theme: "snow",
//       });
//     }
//   }, []);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const description = quillRef.current.root.innerHTML;

//       const { data } = await axios.post(
//         backendUrl + "/api/company/post-job",
//         {
//           title,
//           description,
//           location,
//           salary,
//           level,
//           category,
//         },
//         { headers: { authorization: companyToken } }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         setTitle("");
//         setSalary(0);
//         quillRef.current.root.innerHTML = "";
//         navigate("/dashboard/manage-job");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="w-full">
//       {/* Header */}
//       <div className="mb-6 pb-4 border-b border-gray-200">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Create New Job Posting
//         </h1>
//         <p className="text-gray-600 mt-1">
//           Fill in the details below to post a new job opportunity
//         </p>
//       </div>

//       <form onSubmit={onSubmitHandler} className="space-y-6">
//         {/* Job Title Section */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700 mb-3">
//             Job Title *
//           </label>
//           <input
//             onChange={(e) => setTitle(e.target.value)}
//             value={title}
//             type="text"
//             placeholder="e.g. Senior React Developer"
//             required
//             className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
//           />
//         </div>

//         {/* Job Description Section */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700 mb-3">
//             Job Description *
//           </label>
//           <div className="w-full border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-blue-500 transition-all duration-200">
//             <div ref={editorRef} className="min-h-[200px] bg-white"></div>
//           </div>
//         </div>

//         {/* Job Details Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {/* Job Category */}
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Job Category *
//             </label>
//             <div className="relative">
//               <select
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 bg-white appearance-none cursor-pointer"
//                 required
//               >
//                 {JobCategories.map((category, index) => (
//                   <option value={category} key={index}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                 <svg
//                   className="w-4 h-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Job Location */}
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Job Location *
//             </label>
//             <div className="relative">
//               <select
//                 className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 bg-white appearance-none cursor-pointer"
//                 onChange={(e) => setLocation(e.target.value)}
//                 required
//               >
//                 {JobLocations.map((location, index) => (
//                   <option value={location} key={index}>
//                     {location}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                 <svg
//                   className="w-4 h-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Job Level */}
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Job Level *
//             </label>
//             <div className="relative">
//               <select
//                 className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 bg-white appearance-none cursor-pointer"
//                 onChange={(e) => setLevel(e.target.value)}
//                 required
//               >
//                 <option value="Begginer Level">Beginner Level</option>
//                 <option value="Intermediate Level">Intermediate Level</option>
//                 <option value="Begginer Level">Hard Level</option>
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
//                 <svg
//                   className="w-4 h-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Salary Section */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Job Salary (₹) *
//           </label>
//           <div className="relative max-w-xs">
//             <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
//               ₹
//             </span>
//             <input
//               onChange={(e) => setSalary(e.target.value)}
//               value={salary}
//               type="Number"
//               min={0}
//               className="w-full pl-7 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700"
//               placeholder="25,000"
//               required
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="pt-4">
//           <button
//             type="submit"
//             className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
//           >
//             Create Job Post
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddJob;
