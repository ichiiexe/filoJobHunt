import Job from "../models/job.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create({
    ...req.body,
    postedBy: req.user._id,
    status: "open",
  });

  res.status(201).json({
    success: true,
    data: job,
  });
});

export const getJobs = asyncHandler(async (req, res) => {
  const { title, location, experienceLevel, jobType, locationType } = req.query;

  const filter = {};

  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }

  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }

  if (experienceLevel) {
    filter.experienceLevel = experienceLevel;
  }

  if (jobType) {
    filter.jobType = jobType;
  }

  if (locationType) {
    filter.locationType = locationType;
  }

  const jobs = await Job.find(filter)
    .populate("postedBy", "fullname email role")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    results: jobs.length,
    data: jobs,
  });
});

export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
    .populate("postedBy", "fullname email role")
    .populate("companyId", "name");

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    data: {
      ...job.toObject(),
      company: job.companyId?.name || job.company,
    },
  });
});

export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  // Allow admins to edit any job, or job owner to edit their own job
  if (
    req.user.role !== "admin" &&
    job.postedBy.toString() !== req.user._id.toString()
  ) {
    const error = new Error("You are not authorized to edit this job");
    error.statusCode = 403;
    throw error;
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate("postedBy", "fullname email role")
    .populate("companyId", "name");

  res.status(200).json({
    success: true,
    data: {
      ...updatedJob.toObject(),
      company: updatedJob.companyId?.name || updatedJob.company,
    },
  });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  // Allow admins to delete any job, or job owner to delete their own job
  if (
    req.user.role !== "admin" &&
    job.postedBy.toString() !== req.user._id.toString()
  ) {
    const error = new Error("You are not authorized to delete this job");
    error.statusCode = 403;
    throw error;
  }

  await Job.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
});
