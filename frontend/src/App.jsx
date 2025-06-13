import React, { useContext } from "react";
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
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react"
const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);
    const location = useLocation(); // Get the current location

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on route change
  }, [location]); // Trigger on location change
  return (
    <div className="bg-gray-50">
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        {companyToken ? (
          <>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="add-job" element={<AddJob />} />
              <Route path="manage-job" element={<ManageJob />} />
              <Route path="view-applications" element={<ViewApplication />} />
            </Route>
          </>
        ) : null}
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
       <Analytics />
    </div>
  );
};

export default App;
