import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/jobApplication.js";

// Register a new company
const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExist = await Company.findOne({ email });
    if (companyExist) {
      return res.json({
        success: false,
        message: "Email already registered. Try a new one",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: "LASNA",
      use_filename: true, // Keeps original file name
      unique_filename: true,
    });

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });
    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
      message: "Company registered successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Error in registerCompany controller: ${error.message} `,
    });
  }
};

// Company login
const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "Missing Detail" });
  }
  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.json({ success: false, message: "email Not found" });
    }

    // const isMatch = await bcrypt.compare(password, company.password);
    if (await bcrypt.compare(password, company.password)) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
        message: "login successfully",
      });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: `Error in loginCompany controller: ${error.message} `,
    });
  }
};

// Get company dataauthorization
const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({
      success: true,
      company,
      // message: "Company data fetched successfully"
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Error in getCompanyData  controller: ${error.message} `,
    });
  }
};

// Post a new job
// Post a new job
const postJob = async (req, res) => {
  const { 
    title, 
    description, 
    district,
    location, 
    salary, 
    category,
    deadlineDate,
    jobType,
    experienceRequired,
    skills,
    contactEmail
  } = req.body;
  
  const companyId = req.company._id;
  
  try {
    // Validate required fields
    if (!title || !description || !district || !location || !category || !deadlineDate || !experienceRequired) {
      return res.json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    // Validate deadline date is in the future
    const deadline = new Date(deadlineDate);
    if (deadline <= new Date()) {
      return res.json({
        success: false,
        message: "Deadline date must be in the future"
      });
    }

    const newJob = new Job({
      title,
      description,
      district,
      location,
      salary :salary || null,
      companyId,
      category,
      deadlineDate: deadline,
      jobType: jobType || "full-time",
      experienceRequired :  experienceRequired || null,
      skills: skills || [],
      contactEmail,
      date: new Date(), // Current date when job is posted
      visible: true,
      isActive: true,
    });

    await newJob.save();
    
    res.json({
      success: true,
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Error in postJob controller:", error);
    res.json({
      success: false,
      message: `Error in postJob controller: ${error.message}`,
    });
  }
};
// const postJob = async (req, res) => {
//   const { title, description, location, salary, level, category } = req.body;
//   const companyId = req.company._id;
//   try {
//     const newJob = new Job({
//       title,
//       description,
//       location,
//       salary,
//       companyId,
//       level,
//       category,
//       date: Date.now(),
//     });

//     await newJob.save();
//     res.json({
//       success: true,
//       message: "Job posted successfully",
//       job: newJob,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: `Error in getCompanyData  controller: ${error.message} `,
//     });
//   }
// };

// Get company job applicants
const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;

    // find job  applicaytion gor the user and populate related data
    const applications = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({
      success: false,
      message: `Error in getCompanyJobApplicants controller: ${error.message} `,
    });
  }
};

// Get company posted jobs
const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    // TIDO ADDING NO> OF THE APPLICATION INFO IN DATA

    /**
     * An array of job objects with an additional 'applicants' property.
     * Each object represents a job and the number of applicants for that job.
     *
     * @type {Array<Object>}
     * @property {Object} job - The job object converted to a plain JavaScript object.
     * @property {number} applicants - The number of applicants for the job.
     */
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({
      success: false,
      message: `Error in getCompanyPostedJobs controller: ${error.message} `,
    });
  }
};

// Change job application status
const changeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    // find job application and update status
    await JobApplication.findByIdAndUpdate({ _id: id }, { status });

    res.json({ success: true, message: "Status Changed" });
  } catch (error) {
    res.json({
      success: false,
      message: `Error in changeJobApplicationStatus controller: ${error.message} `,
    });
  }
};

// Change job visibility
const changeVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;
    const job = await Job.findById(id);

    if (!job) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.companyId.toString() === companyId.toString()) {
      job.visible = !job.visible;
      await job.save();
      res.json({
        success: true,
        message: "Job visibility changed successfully",
        job,
      });
    } else {
      res.json({
        success: false,
        message: "Unauthorized: You cannot change visibility of this job",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: `Error in changeVisibility controller: ${error.message} `,
    });
  }
};

export {
  registerCompany,
  loginCompany,
  getCompanyData,
  postJob,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  changeJobApplicationStatus,
  changeVisibility,
};
