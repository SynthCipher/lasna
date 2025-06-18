import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJob from "./pages/ManageJob";
import ViewApplication from "./pages/ViewApplication";
import NotFound from "./pages/NotFound";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import CompanyProfile from "./pages/CompanyProfile";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy ";
import JobApplicants from "./pages/JobApplicants";

const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);
  const location = useLocation();

  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showBetaButton, setShowBetaButton] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Disable console.log in this file
  console.log = () => {};

  return (
    <div className="bg-gray-50 min-h-screen relative">
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        {companyToken && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="add-job" element={<AddJob />} />
            <Route path="manage-job" element={<ManageJob />} />
            <Route path="manage-job/:id" element={<JobApplicants />} />
            <Route path="view-applications" element={<ViewApplication />} />
            <Route path="company-profile" element={<CompanyProfile />} />
          </Route>
        )}
        {/* {companyToken && (
          <Route path="/dashboard/company-profile" element={<CompanyProfile />} />
        )} */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Disclaimer with close button */}
      {!showRecruiterLogin && showDisclaimer && (
        <div className="fixed bottom-0 left-0 w-full bg-yellow-100 text-yellow-800 text-sm py-2 px-4 text-center shadow-md z-50 flex justify-center items-center">
          <span className="mr-4">
            <strong>Disclaimer:</strong> Lasna is not a recruiter. We only share
            job information for public awareness. Always verify with the
            official source before taking any action.
          </span>
          <button
            onClick={() => setShowDisclaimer(false)}
            className="ml-auto text-yellow-900 hover:text-red-600 font-bold text-lg px-2"
            title="Close"
          >
            ✖
          </button>
        </div>
      )}

      {/* Simple Beta Button - Fixed above disclaimer */}
      {showBetaButton && (
        <div className={`fixed right-4 z-50 transition-all duration-300 ${
          showDisclaimer ? 'bottom-16' : 'bottom-4'
        }`}>
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center">
            {/* Content */}
            <div className="flex items-center px-4 py-2">
              {/* Beta indicator */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold tracking-wider">BETA</span>
              </div>
              
              {/* Close button */}
              {/* <button
                onClick={() => setShowBetaButton(false)}
                className="ml-3 w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xs transition-colors duration-200"
                title="Close"
              >
                ×
              </button> */}
            </div>
          </div>
        </div>
      )}

      <Analytics />
    </div>
  );
};

export default App;