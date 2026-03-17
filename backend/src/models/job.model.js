import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    company: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        "Technology",
        "Design",
        "Marketing",
        "Sales",
        "Finance",
        "Healthcare",
        "Education",
        "Engineering",
      ],
      required: true,
      trim: true,
    },
    experienceLevel: {
      type: String,
      enum: ["No experience", "With experience", "Entry", "Mid", "Senior"],
      required: true,
    },
    jobType: {
      type: String,
      enum: [
        "full-time",
        "part-time",
        "contract",
        "internship",
        "temporary",
        "unknown",
      ],
      default: "unknown",
      required: true,
    },
    locationType: {
      type: String,
      enum: ["live-in", "onsite", "remote", "hybrid", "unknown"],
      required: true,
    },
    location: { type: String, required: true, trim: true },
    salary: { type: Number, required: true },
    skillsRequired: { type: [String], required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [String],
    status: {
      type: String,
      enum: ["open", "closed", "paused"],
      default: "open",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Job", jobSchema);
