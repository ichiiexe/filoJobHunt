import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser); // upload.single('avatar')
router.post("/login", loginUser);
// router.get('/me', protect, fetchLoggedInUser);

export default router;
