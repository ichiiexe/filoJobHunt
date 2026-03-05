import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true, trim: true },
        companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
        jobType: {
            type: String,
            enum: ['full-time', 'part-time', 'contract', 'internship', 'temporary'],
            required: true,
        },
        locationType: {
            type: String,
            enum: ['onsite', 'remote', 'hybrid'],
            required: true,
        },
        location: { type: String, required: true, trim: true },
        salaryRange: {
            min: { type: Number },
            max: { type: Number },
        },
        skillsRequired: { type: [String], required: true },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        tags: [String],
        status: {
            type: String,
            enum: ['open', 'closed', 'paused'],
            default: 'open',
        },
    },
    { timestamps: true }
);

export default mongoose.model("Job", jobSchema);