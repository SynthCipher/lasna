import React, { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const CompanyProfile = () => {
  const { companyData, setCompanyData, companyToken, backendUrl } =
    useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Initialize form data when modal opens
  useEffect(() => {
    if (isModalOpen && companyData) {
      setFormData({
        name: companyData.name || "",
        email: companyData.email || "",
        image: null,
      });
      setImagePreview(null);
    }
  }, [isModalOpen, companyData]);

  // Fetch company jobs for statistics
  const fetchCompanyJobs = async () => {
    try {
      setStatsLoading(true);
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { authorization: companyToken },
      });
      if (data.success) {
        setJobs(data.jobsData || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch job statistics");
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  // Calculate real statistics
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((job) => job.visible !== false).length;
  const totalApplications = jobs.reduce(
    (sum, job) => sum + (job.applicants || 0),
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const { data } = await axios.put(
        `${backendUrl}/api/company/update-profile`,
        formDataToSend,
        {
          headers: {
            authorization: companyToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setCompanyData(data.company);
        setIsModalOpen(false);
        toast.success("Profile updated successfully!");
        // Reset form and preview
        setFormData({
          name: "",
          email: "",
          image: null,
        });
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data and preview
    setFormData({
      name: companyData?.name || "",
      email: companyData?.email || "",
      image: null,
    });
    setImagePreview(null);
    setIsModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  // Close modal when clicking outside
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!companyData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading company profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
        <p className="text-gray-600 mt-2">
          Manage your company information and settings
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Sidebar/Profile + Stats */}
          <div className="bg-gray-50 p-6 flex flex-col items-center text-center space-y-6 border-r border-gray-200">
            <div className="relative">
              <img
                src={companyData.image}
                alt={companyData.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {companyData.name}
              </h2>
              <p className="text-sm text-gray-500">{companyData.email}</p>
            </div>

            <button
              onClick={handleEditClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all flex items-center space-x-2"
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
              <span>Edit Profile</span>
            </button>

            {/* Additional Information Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Information
              </h3>

              <div className="flex flex-col gap-6">
                <div className="flex max-sm:flex-col items-center gap-3">
                  <h4 className="text-sm font-medium text-gray-500">
                    Company Status
                  </h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>

                <div className="flex max-sm:flex-col items-center gap-3">
                  <h4 className="text-sm font-medium text-gray-500">
                    Last Updated
                  </h4>
                  <p className="text-sm text-gray-900">
                    {companyData?.updatedAt
                      ? new Date(companyData.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </p>
                </div>

                <div className="flex max-sm:flex-col items-center gap-3">
                  <h4 className="text-sm font-medium text-gray-500">
                    Created On
                  </h4>
                  <p className="text-sm text-gray-900">
                    {companyData?.createdAt
                      ? new Date(companyData.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content: Profile View */}
          <div className="lg:col-span-2 p-6">
            <div className="space-y-6">
              {/* Company Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Company Name
                  </h3>
                  <p className="text-lg text-gray-900">{companyData.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Email Address
                  </h3>
                  <p className="text-lg text-gray-900">{companyData.email}</p>
                </div>
              </div>

              {/* Company Statistics */}
              <div className="w-full pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                  Company Statistics
                </h3>
                {statsLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-sm text-gray-600">
                      Loading...
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {activeJobs}
                      </div>
                      <div className="text-sm text-blue-600">Active Jobs</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {totalApplications}
                      </div>
                      <div className="text-sm text-green-600">
                        Total Applications
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {totalJobs}
                      </div>
                      <div className="text-sm text-purple-600">
                        Total Jobs Posted
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {/* Profile Image Section */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <img
                      src={imagePreview || companyData.image}
                      alt={companyData.name}
                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Click to change photo
                  </p>
                </div>

                {/* Company Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Image Upload Info */}
                {formData.image && (
                  <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <svg
                      className="w-5 h-5 text-green-600"
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
                    <span className="text-sm text-green-700">
                      New image selected: {formData.image.name}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 py-2 px-4 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;

// <div className="max-w-4xl mx-auto">
//   {/* Header */}
//   <div className="mb-8">
//     <h1 className="text-3xl  font-bold text-gray-900">Company Profile</h1>
//     <p className="text-gray-600 mt-2">
//       Manage your company information and settings
//     </p>
//   </div>

//   {/* Profile Card */}
//   <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//     {/* Profile Header */}
//     <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <img
//               src={companyData.image}
//               alt={companyData.name}
//               className="w-10 h-10  sm:w-20 sm:h-20 rounded-full border-4 border-white bg-white shadow-lg object-cover"
//             />
//             {isEditing && (
//               <button
//                 type="button"
//                 onClick={() => fileInputRef.current?.click()}
//                 className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>
//               </button>
//             )}
//           </div>
//           <div className="text-white">
//             <h2 className="text-2xl font-bold">{companyData.name}</h2>
//             <p className="text-blue-100">{companyData.email}</p>
//           </div>
//         </div>

//         {!isEditing && (
//           <button
//             onClick={handleEditClick}
//             className="bg-white text-gray-700 bg-opacity-20 max-sm:px-2 max-sm:py-1  hover:bg-opacity-30  px-4 py-2 rounded-lg transition-all flex items-center space-x-2"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//               />
//             </svg>{" "}
//             <span className="max-sm:text-sm">Edit</span>
//             <span className="max-sm:hidden ml-1"> Profile</span>
//           </button>
//         )}
//       </div>
//     </div>

//     {/* Profile Content */}
//     <div className="p-6">
//       {isEditing ? (
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="hidden"
//           />

//           {/* Company Name */}
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Company Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               required
//             />
//           </div>

//           {/* Image Upload Info */}
//           {formData.image && (
//             <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
//               <svg
//                 className="w-5 h-5 text-green-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <span className="text-sm text-green-700">
//                 New image selected: {formData.image.name}
//               </span>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex space-x-4 pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
//             >
//               {loading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   <span>Updating...</span>
//                 </>
//               ) : (
//                 <>
//                   <span>Save <span className="max-sm:hidden">Changes</span></span>
//                 </>
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               disabled={loading}
//               className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
//             >
//               <span>Cancel</span>
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="space-y-6">
//           {/* Company Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-2">
//                 Company Name
//               </h3>
//               <p className="text-lg text-gray-900">{companyData.name}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-2">
//                 Email Address
//               </h3>
//               <p className="text-lg text-gray-900">{companyData.email}</p>
//             </div>
//           </div>

//           {/* Company Stats */}
//           <div className="border-t pt-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Company Statistics
//             </h3>
//             {statsLoading ? (
//               <div className="flex items-center justify-center py-8">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                 <span className="ml-2 text-gray-600">
//                   Loading statistics...
//                 </span>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <div className="text-2xl font-bold text-blue-600">
//                     {activeJobs}
//                   </div>
//                   <div className="text-sm text-blue-600">Active Jobs</div>
//                 </div>
//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <div className="text-2xl font-bold text-green-600">
//                     {totalApplications}
//                   </div>
//                   <div className="text-sm text-green-600">
//                     Total Applications
//                   </div>
//                 </div>
//                 <div className="bg-purple-50 p-4 rounded-lg">
//                   <div className="text-2xl font-bold text-purple-600">
//                     {totalJobs}
//                   </div>
//                   <div className="text-sm text-purple-600">
//                     Total Jobs Posted
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// </div>
// <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//   {/* Header */}
//   <div className="mb-6">
//     <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
//     <p className="text-gray-600 mt-2">
//       Manage your company information and settings
//     </p>
//   </div>

//   <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
//       {/* Sidebar/Profile + Stats */}
//       <div className="bg-gray-50 p-6 flex flex-col items-center text-center space-y-6 border-r border-gray-200">
//         <div className="relative">
//           <img
//             src={companyData.image}
//             alt={companyData.name}
//             className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
//           />
//           {isEditing && (
//             <button
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//               className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//             </button>
//           )}
//         </div>
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900">
//             {companyData.name}
//           </h2>
//           <p className="text-sm text-gray-500">{companyData.email}</p>
//         </div>
//         {!isEditing && (
//           <button
//             onClick={handleEditClick}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
//           >
//             Edit Profile
//           </button>
//         )}
//         {/* Company Stats */}
//         <div className="space-y-2 pt-4 w-full">
//           <div className="bg-blue-100 rounded-lg px-4 py-2 text-blue-800 font-medium flex justify-between">
//             <span>Active Jobs</span>
//             <span>{activeJobs}</span>
//           </div>
//           <div className="bg-green-100 rounded-lg px-4 py-2 text-green-800 font-medium flex justify-between">
//             <span>Applications</span>
//             <span>{totalApplications}</span>
//           </div>
//           <div className="bg-purple-100 rounded-lg px-4 py-2 text-purple-800 font-medium flex justify-between">
//             <span>Total Posted</span>
//             <span>{totalJobs}</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content: Form or View */}
//       <div className="lg:col-span-2 p-6">
//         {isEditing ? (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />

//             {/* Name */}
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Company Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* New Image Info */}
//             {formData.image && (
//               <div className="bg-green-50 border border-green-200 rounded-md px-4 py-2 text-green-700 flex items-center space-x-2">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <span>New image selected: {formData.image.name}</span>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex gap-4 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 disabled:bg-blue-400"
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
//                     Updating...
//                   </>
//                 ) : (
//                   <>Save Changes</>
//                 )}
//               </button>
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         ) : (
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">
//                 Company Name
//               </h3>
//               <p className="text-lg text-gray-900">{companyData.name}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">
//                 Email Address
//               </h3>
//               <p className="text-lg text-gray-900">{companyData.email}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// </div>
