import express from "express";
import {
  registerUser,
  loginUser,
  fetchLoggedInUser,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import { registerSchema, loginSchema } from "../validation/authValidation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser); // upload.single('avatar')
router.post("/login", validate(loginSchema), loginUser);
router.get("/me", protect, fetchLoggedInUser);

export default router;
