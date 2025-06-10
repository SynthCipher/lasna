import Job from "../models/Job.js";
import JobApplication from "../models/jobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

// Get user data
const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({
      success: false,
      message: `Error in getUserData controller: ${error.message} `,
    });
  }
};

// Apply for the job
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.auth.userId;

    const isAlreadyApplied = await JobApplication.findOne({ jobId, userId });

    if (isAlreadyApplied) {
      return res.json({ success: false, message: "Already Applied" });
    }
    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({ success: false, message: "Job Not Found" });
    }

    await JobApplication.create({
      userId,
      companyId: jobData.companyId,
      jobId,
      date: Date.now(),
    });
    res.json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: `Error in applyForJob controller: ${error.message} `,
    });
  }
};

// Get users applied application
const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No job applications found for this user",
      });
    }

    res.json({ success: true, applications });
  } catch (error) {
    res.json({
      success: false,
      message: `Error in getUserJobApplications controller: ${error.message} `,
    });
  }
};

// update user profile (resume)
const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.resumeFile;
    

    const userData = await User.findById(userId);

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
        folder: "LASNA RESUME",
        use_filename: true, // Keeps original file name
        unique_filename: true,
      });
      userData.resume = resumeUpload.secure_url;
      // await User.findByIdAndUpdate(userId, {
      //   resume: resumeUpload.secure_url,
      // });
    }
    await userData.save();
    res.json({ success: true, message: "Resume Updated" });
  } catch (error) {
    res.json({
      success: false,
      message: `Error in updateUserResume controller: ${error.message} `,
    });
  }
};

export { getUserData, applyForJob, getUserJobApplications, updateUserResume };
