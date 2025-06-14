import Job from "../models/Job.js";

// Helper function to check and update job visibility based on deadline
const updateJobVisibilityByDeadline = async () => {
  try {
    const currentDate = new Date();
    const fourDaysAgo = new Date(
      currentDate.getTime() - 4 * 24 * 60 * 60 * 1000
    );

    // Find jobs that are past deadline by more than 4 days and still visible
    await Job.updateMany(
      {
        deadlineDate: { $lt: fourDaysAgo },
        visible: true,
      },
      {
        visible: false,
      }
    );
  } catch (error) {
    console.error("Error updating job visibility:", error);
  }
};

// Get all jobs
const getJobs = async (req, res) => {
  try {
    // Update job visibility before fetching
    await updateJobVisibilityByDeadline();

    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });

    res.json({ success: true, jobs });
  } catch (error) {
    res.json({
      success: false,
      message: `Error in getJobs controller: ${error.message}`,
    });
  }
};

// Get a single job by id
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    // Update job visibility before fetching
    await updateJobVisibilityByDeadline();

    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });

    if (!job || !job.visible) {
      return res.json({
        success: false,
        message: "Job not found or no longer available",
      });
    }

    res.json({ success: true, job });
  } catch (error) {
    res.json({
      success: false,
      message: `Error in getJobById controller: ${error.message}`,
    });
  }
};

// Alternative approach: Filter jobs dynamically without updating database
// const getJobsWithDynamicVisibility = async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const fourDaysAgo = new Date(currentDate.getTime() - (4 * 24 * 60 * 60 * 1000));

//     const jobs = await Job.find({
//       visible: true,
//       deadlineDate: { $gte: fourDaysAgo } // Only jobs within 4 days of deadline
//     }).populate({
//       path: "companyId",
//       select: "-password",
//     });

//     res.json({ success: true, jobs });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: `Error in getJobs controller: ${error.message}`,
//     });
//   }
// };

// Cron job function to run periodically (e.g., daily)
const cleanupExpiredJobs = async () => {
  try {
    const currentDate = new Date();
    const fourDaysAgo = new Date(
      currentDate.getTime() - 4 * 24 * 60 * 60 * 1000
    );

    const result = await Job.updateMany(
      {
        deadlineDate: { $lt: fourDaysAgo },
        visible: true,
      },
      {
        visible: false,
        updatedAt: currentDate,
      }
    );

    console.log(`Updated ${result.modifiedCount} expired jobs to invisible`);
    return result;
  } catch (error) {
    console.error("Error in cleanupExpiredJobs:", error);
    throw error;
  }
};

export { getJobById, getJobs, cleanupExpiredJobs };

// import Job from "../models/Job.js";

// // Get all jobs
// const getJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find({ visible: true }).populate({
//       path: "companyId",
//       select: "-password",
//     });
//     // res.send(jobs);
//     res.json({ success: true, jobs });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: `Error in getJobs controller: ${error.message}`,
//     });
//   }
// };

// // Get a single job by id
// const getJobById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const job = await Job.findById(id).populate({
//       path: "companyId",
//       select: "-password",
//     });
//     if (!job) {
//       return res.json({ success: false, message: "Job not found" });
//     }
//     res.json({ success: true, job });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: `Error in getJobById controller: ${error.message}`,
//     });
//   }
// };

// export { getJobById, getJobs };
