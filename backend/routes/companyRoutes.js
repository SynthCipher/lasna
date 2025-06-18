import express from "express";
import {
  changeJobApplicationStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  getJobApplicantsByJobId,
  loginCompany,
  postJob,
  registerCompany,
  updateCompanyProfile,
} from "../controller/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register a new company
router.post("/register", upload.single("image"), registerCompany);

// Company login
router.post("/login", loginCompany);

// Get company profile data
router.get("/company", protectCompany, getCompanyData);

// Post a new job
router.post("/post-job", protectCompany, postJob);

// Get all applicants for company's jobs
router.get("/applicants", protectCompany, getCompanyJobApplicants);

// Get list of jobs posted by the company
router.get("/list-jobs", protectCompany, getCompanyPostedJobs);

// Change the status of a job application
router.post("/change-status", protectCompany, changeJobApplicationStatus);

// Change the visibility of a job posting
router.post("/change-visibility", protectCompany, changeVisibility);

// Update company profile
router.put("/update-profile", protectCompany, upload.single("image"), updateCompanyProfile);

// Get applicants for a specific job by job ID
router.get("/job-applicants/:jobId", protectCompany, getJobApplicantsByJobId);

export default router;
