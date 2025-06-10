import React, { useContext } from "react";
import { BiHardHat } from "react-icons/bi";
import { Route, Routes } from "react-router-dom";
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
const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);
  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        {companyToken ? (
          <>
            {" "}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="add-job" element={<AddJob />} />
              <Route path="manage-job" element={<ManageJob />} />
              <Route path="view-applications" element={<ViewApplication />} />
            </Route>
          </>
        ) : null}
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </div>
  );
};

export default App;
