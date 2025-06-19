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
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
  const [salary, setSalary] = useState(0);
  const [deadlineDate, setDeadlineDate] = useState("");
  const [jobType, setJobType] = useState("");
  const [skills, setSkills] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [jobDescriptionError, setJobDescriptionError] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobLink, setJobLink] = useState("");

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

  const validateForm = () => {
    const newErrors = {};

    // Job Title validation
    if (!title.trim()) {
      newErrors.title = "Job title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Job title must be at least 3 characters long";
    }

    // Job Description validation
    const textContent = editorRef.current?.textContent || "";
    const cleanContent = textContent.trim();
    if (cleanContent === "" || cleanContent.length === 0) {
      newErrors.jobDescription = "Job description is required";
      setJobDescriptionError("Job description is required");
    } else if (cleanContent.length < 50) {
      newErrors.jobDescription =
        "Job description must be at least 50 characters long";
      setJobDescriptionError(
        "Job description must be at least 50 characters long"
      );
    } else {
      setJobDescriptionError("");
    }

    // District validation
    if (!district) {
      newErrors.district = "Please select a district";
    }

    // Location validation
    if (!location.trim()) {
      newErrors.location = "Job location is required";
    }

    // Category validation
    if (!category) {
      newErrors.category = "Please select a job category";
    }

    // Experience validation
    if (!experienceRequired) {
      newErrors.experienceRequired = "Please select experience level";
    }

    // Job Type validation
    if (!jobType) {
      newErrors.jobType = "Please select a job type";
    }

    // Deadline validation
    if (!deadlineDate) {
      newErrors.deadlineDate = "Application deadline is required";
    } else {
      const selectedDate = new Date(deadlineDate);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (selectedDate <= tomorrow) {
        newErrors.deadlineDate = "Deadline must be at least 2 days from today";
      }
    }

    // Salary validation (optional but if provided should be valid)
    if (salary && (isNaN(salary) || salary < 0)) {
      newErrors.salary = "Please enter a valid salary amount";
    }

    // Contact Email validation (optional but if provided should be valid)
    if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    // Skills validation (optional but if provided should be meaningful)
    if (skills && skills.trim().length > 0) {
      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);
      if (skillsArray.length === 0) {
        newErrors.skills = "Please enter valid skills separated by commas";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showValidationErrors = () => {
    const errorMessages = Object.values(errors);
    if (errorMessages.length > 0) {
      // Show a simple alert first, then toast
      alert(
        "Please fix the following errors:\n\n• " + errorMessages.join("\n• ")
      );

      // Also show toast
      toast.error(
        `Please fix ${errorMessages.length} error${
          errorMessages.length > 1 ? "s" : ""
        } in the form`,
        {
          autoClose: 5000,
          position: "top-right",
        }
      );
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const isValid = validateForm();

    if (!isValid) {
      showValidationErrors();
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField === "jobDescription") {
        editorRef.current?.focus();
      } else {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const description = quillRef.current.root.innerHTML;

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
        toast.success("Job posting created successfully!", {
          autoClose: 3000,
          position: "top-right",
        });

        // Reset form
        setTitle("");
        setDistrict("");
        setLocation("Leh");
        setCategory("");
        setExperienceRequired("");
        setSalary(0);
        setDeadlineDate("");
        setJobType("");
        setSkills("");
        setContactEmail("");
        setErrors({});
        quillRef.current.root.innerHTML = "";

        navigate("/dashboard/manage-job");
      } else {
        toast.error(data.message || "Failed to create job posting", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
        {
          position: "top-right",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
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
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
              clearError("title");
            }}
            value={title}
            type="text"
            placeholder="e.g. Senior React Developer"
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 ${
              errors.title
                ? "border-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
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
            <div
              ref={editorRef}
              className="min-h-[200px] bg-white"
              onBlur={() => clearError("jobDescription")}
            ></div>
          </div>
          {jobDescriptionError && (
            <p className="text-red-500 text-sm mt-1">{jobDescriptionError}</p>
          )}
        </div>

        {/* District Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* District */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              District *
            </label>
            <div className="relative">
              <select
                name="district"
                className={`w-full px-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none bg-white appearance-none cursor-pointer ${
                  errors.district
                    ? "border-red-500 focus:border-red-500 text-red-900"
                    : "border-gray-200 focus:border-blue-500"
                } ${district === "" ? "text-gray-400" : "text-gray-700"}`}
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  clearError("district");
                }}
              >
                <option value="" disabled className="text-gray-400">
                  Select a district
                </option>
                {JobLocations.map((location, index) => (
                  <option
                    value={location}
                    key={index}
                    className="text-gray-700"
                  >
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
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">{errors.district}</p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Location *
            </label>
            <input
              name="location"
              onChange={(e) => {
                setLocation(e.target.value);
                clearError("location");
              }}
              value={location}
              type="text"
              placeholder="e.g. Nubra"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 ${
                errors.location
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
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
                name="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  clearError("category");
                }}
                className={`w-full px-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none bg-white appearance-none cursor-pointer ${
                  errors.category
                    ? "border-red-500 focus:border-red-500 text-red-900"
                    : "border-gray-200 focus:border-blue-500"
                } ${category === "" ? "text-gray-400" : "text-gray-700"}`}
              >
                <option value="" disabled className="text-gray-400">
                  Select a category
                </option>
                {JobCategories.map((categoryItem, index) => (
                  <option
                    value={categoryItem}
                    key={index}
                    className="text-gray-700"
                  >
                    {categoryItem}
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
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Experience Required */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Experience Required *
            </label>
            <div className="relative">
              <select
                name="experienceRequired"
                value={experienceRequired}
                className={`w-full px-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none bg-white appearance-none cursor-pointer ${
                  errors.experienceRequired
                    ? "border-red-500 focus:border-red-500 text-red-900"
                    : "border-gray-200 focus:border-blue-500"
                } ${
                  experienceRequired === "" ? "text-gray-400" : "text-gray-700"
                }`}
                onChange={(e) => {
                  setExperienceRequired(e.target.value);
                  clearError("experienceRequired");
                }}
              >
                <option value="" disabled className="text-gray-400">
                  Select experience level
                </option>
                <option value="entry-level" className="text-gray-700">
                  Entry Level
                </option>
                <option value="mid-level" className="text-gray-700">
                  Mid Level
                </option>
                <option value="senior-level" className="text-gray-700">
                  Senior Level
                </option>
                <option value="executive" className="text-gray-700">
                  Executive
                </option>
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
            {errors.experienceRequired && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experienceRequired}
              </p>
            )}
          </div>

          {/* Job Type */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Type *
            </label>
            <div className="relative">
              <select
                name="jobType"
                value={jobType}
                className={`w-full px-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none bg-white appearance-none cursor-pointer ${
                  errors.jobType
                    ? "border-red-500 focus:border-red-500 text-red-900"
                    : "border-gray-200 focus:border-blue-500"
                } ${jobType === "" ? "text-gray-400" : "text-gray-700"}`}
                onChange={(e) => {
                  setJobType(e.target.value);
                  clearError("jobType");
                }}
              >
                <option value="" disabled className="text-gray-400">
                  Select job type
                </option>
                <option value="full-time" className="text-gray-700">
                  Full Time
                </option>
                <option value="part-time" className="text-gray-700">
                  Part Time
                </option>
                <option value="contract" className="text-gray-700">
                  Contract
                </option>
                <option value="internship" className="text-gray-700">
                  Internship
                </option>
                <option value="internship" className="text-gray-700">
                  Volunter
                </option>
                <option value="freelance" className="text-gray-700">
                  Freelance
                </option>
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
            {errors.jobType && (
              <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>
            )}
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
                name="salary"
                onChange={(e) => {
                  setSalary(e.target.value);
                  clearError("salary");
                }}
                value={salary}
                type="number"
                min={0}
                className={`w-full pl-7 pr-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 ${
                  errors.salary
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                placeholder="25,000"
              />
            </div>
            {errors.salary && (
              <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
            )}
          </div>

          {/* Deadline Date */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Application Deadline *
            </label>
            <input
              name="deadlineDate"
              onChange={(e) => {
                setDeadlineDate(e.target.value);
                clearError("deadlineDate");
              }}
              value={deadlineDate}
              type="date"
              min={
                new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              }
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 ${
                errors.deadlineDate
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
            />
            {errors.deadlineDate && (
              <p className="text-red-500 text-sm mt-1">{errors.deadlineDate}</p>
            )}
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
              name="skills"
              onChange={(e) => {
                setSkills(e.target.value);
                clearError("skills");
              }}
              value={skills}
              type="text"
              placeholder="e.g. React, Node.js, MongoDB"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 ${
                errors.skills
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
            />
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
            )}
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Email
            </label>
            <input
              name="contactEmail"
              onChange={(e) => {
                setContactEmail(e.target.value);
                clearError("contactEmail");
              }}
              value={contactEmail}
              type="email"
              placeholder="hr@company.com"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 ${
                errors.contactEmail
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 cursor-pointer hover:bg-blue-700 text-white hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
          >
            {isSubmitting ? "Creating Job Post..." : "Create Job Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
