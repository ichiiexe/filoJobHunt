import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";
import { validate } from "../middleware/validationMiddleware.js";
import { jobSchema } from "../validation/jobValidation.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, validate(jobSchema), createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);
router.put("/:id", protect, validate(jobSchema), updateJob);
router.delete("/:id", protect, deleteJob);

export default router;
