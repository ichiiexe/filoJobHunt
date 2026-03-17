import Joi from "joi";

export const registerSchema = Joi.object({
  fullname: Joi.string().min(2).max(50).trim().required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 2 characters",
    "string.max": "Full name cannot exceed 50 characters",
    "any.required": "Full name is required",
  }),
  email: Joi.string().email().lowercase().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password cannot exceed 100 characters",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  role: Joi.string()
    .valid("jobseeker", "recruiter", "admin")
    .default("jobseeker")
    .messages({
      "any.only": "Role must be either jobseeker, recruiter, or admin",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});
