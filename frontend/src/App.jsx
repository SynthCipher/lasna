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

const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);
  const location = useLocation();

  const [showDisclaimer, setShowDisclaimer] = useState(true);

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
        {companyToken && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="add-job" element={<AddJob />} />
            <Route path="manage-job" element={<ManageJob />} />
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

      <Analytics />
    </div>
  );
};

export default App;
