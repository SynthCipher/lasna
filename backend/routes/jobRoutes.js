import express from "express";
import { getJobById, getJobs } from "../controller/jobController.js";
const router = express.Router();

// Router to get the jobs data
router.get("/", getJobs);

// Router to get a single job by id
router.get("/:id", getJobById);



export default router;
