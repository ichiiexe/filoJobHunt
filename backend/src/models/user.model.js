import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePhoto:{
        url: String,
        public_id: String,
    },
    role: {
    type: String,
    enum: ['jobseeker', 'recruiter', 'admin'],
    default: 'jobseeker',
  },
  
  // Extended profile for job seekers
   profile: {
    phone: String,
    address: String,
    summary: String, // short bio or career summary
    skills: [String],
    experience: [
      {
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    resumeUrl: String, // URL to uploaded resume (PDF)
    portfolio: [String], // URLs to portfolio projects or links
    desiredRoles: [String], // e.g., ['Frontend Developer', 'Fullstack Developer']
    location: String, // city or preferred work location
    availability: { type: String, enum: ['immediate', '1 month', '3 months'], default: 'immediate' },
  },

  // Job application tracking (optional)
  applications: [
    {
      jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
      status: { type: String, enum: ['applied', 'interview', 'offer', 'rejected'], default: 'applied' },
      appliedAt: { type: Date, default: Date.now },
    },
  ],

}, { timestamps: true});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.model('User', userSchema);

export default User;
