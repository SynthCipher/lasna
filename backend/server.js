import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controller/webhooks.js";

import companyRoutes from "./routes/companyRoutes.js";

import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";

// initialize express
const app = express();

// connect to database and connect cloudinary
await connectDB();

//  middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

await connectCloudinary();

// Routes
app.get("/", (req, res) => {
  res.send("LASNA server is working");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks);

// All other API routes
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

// Port
const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

// In your main server file (app.js or server.js)
import cron from "node-cron";
import { cleanupExpiredJobs } from "./controller/jobController.js";

// Run cleanup every day at 2 AM
cron.schedule("0 2 * * *", async () => {
  try {
    console.log("Running daily job cleanup...");
    await cleanupExpiredJobs();
  } catch (err) {
    console.error("Cron job failed:", err);
  }
});

app.listen(PORT, (req, res) => {
  console.log("server is running on port : ", PORT);
});
