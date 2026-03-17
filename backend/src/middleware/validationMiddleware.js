import asyncHandler from "../utils/asyncHandler.js";

export const validate = (schema) => {
  return asyncHandler(async (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      const validationError = new Error("Validation failed");
      validationError.statusCode = 400;
      validationError.errors = errors;
      throw validationError;
    }

    next();
  });
};
