import Joi from "joi";

export const jobSchema = Joi.object({
  title: Joi.string().min(3).max(100).trim().required().messages({
    "string.empty": "Job title is required",
    "string.min": "Job title must be at least 3 characters",
    "string.max": "Job title cannot exceed 100 characters",
    "any.required": "Job title is required",
  }),
  description: Joi.string().min(10).max(2000).trim().required().messages({
    "string.empty": "Job description is required",
    "string.min": "Job description must be at least 10 characters",
    "string.max": "Job description cannot exceed 2000 characters",
    "any.required": "Job description is required",
  }),
  company: Joi.string().min(1).max(100).trim().required().messages({
    "string.empty": "Company name is required",
    "string.min": "Company name must be at least 1 character",
    "string.max": "Company name cannot exceed 100 characters",
    "any.required": "Company name is required",
  }),
  category: Joi.string()
    .valid(
      "Technology",
      "Design",
      "Marketing",
      "Sales",
      "Finance",
      "Healthcare",
      "Education",
      "Engineering",
    )
    .required()
    .messages({
      "any.only": "Please select a valid category",
      "any.required": "Category is required",
    }),
  experienceLevel: Joi.string()
    .valid("No experience", "With experience", "Entry", "Mid", "Senior")
    .required()
    .messages({
      "any.only": "Please select a valid experience level",
      "any.required": "Experience level is required",
    }),
  jobType: Joi.string()
    .valid(
      "full-time",
      "part-time",
      "contract",
      "internship",
      "temporary",
      "unknown",
    )
    .default("unknown")
    .messages({
      "any.only": "Please select a valid job type",
    }),
  locationType: Joi.string()
    .valid("live-in", "onsite", "remote", "hybrid", "unknown")
    .required()
    .messages({
      "any.only": "Please select a valid location type",
      "any.required": "Location type is required",
    }),
  location: Joi.string().min(2).max(100).trim().required().messages({
    "string.empty": "Location is required",
    "string.min": "Location must be at least 2 characters",
    "string.max": "Location cannot exceed 100 characters",
    "any.required": "Location is required",
  }),
  salary: Joi.number().min(0).required().messages({
    "number.base": "Salary must be a number",
    "number.min": "Salary cannot be negative",
    "any.required": "Salary is required",
  }),
  skillsRequired: Joi.array()
    .items(Joi.string().trim().min(1).max(50))
    .min(1)
    .required()
    .messages({
      "array.base": "Skills required must be an array",
      "array.min": "At least one skill is required",
      "string.empty": "Skill cannot be empty",
      "string.min": "Skill must be at least 1 character",
      "string.max": "Skill cannot exceed 50 characters",
      "any.required": "Skills required is required",
    }),
  tags: Joi.array().items(Joi.string().trim().min(1).max(30)).max(10).messages({
    "array.base": "Tags must be an array",
    "array.max": "Maximum 10 tags allowed",
    "string.empty": "Tag cannot be empty",
    "string.min": "Tag must be at least 1 character",
    "string.max": "Tag cannot exceed 30 characters",
  }),
});
