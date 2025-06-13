import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      // required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    deadlineDate: {
      type: Date,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    // Additional important fields
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "freelance"],
      default: "full-time",
    },
    experienceRequired: {
      type: String,
      enum: ["entry-level", "mid-level", "senior-level", "executive"],
      required: true,
    },
    skills: [{
      type: String,
      trim: true,
    }],

    isActive: {
      type: Boolean,
      default: true,
    },
    contactEmail: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
JobSchema.index({ district: 1, category: 1 });
JobSchema.index({ deadlineDate: 1 });
JobSchema.index({ companyId: 1 });

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);
export default Job;


// import mongoose from "mongoose";

// const JobSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     level: {
//       type: String,
//       required: true,
//     },
//     salary: {
//       type: Number,
//       required: true,
//     },
//     date: {
//       type: Number,
//       required: true,
//     },
//     visible: {
//       type: Boolean,
//       default: true,
//     },
//     companyId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Company",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);
// export default Job;
