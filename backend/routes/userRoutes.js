import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controller/userController.js";
import upload from "../config/multer.js";
const router = express.Router();

// Get user Data
router.get("/user", getUserData);


// applied for the job
router.post("/apply", applyForJob);

// Get APpled job Data
router.get("/applications", getUserJobApplications);

// Update user profile resume
router.post("/update-resume", upload.single("resume"), updateUserResume);

export default router;
