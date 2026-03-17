import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, role } = req.body;

  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    const error = new Error("Email already in use");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.create({
    fullname,
    email: email.toLowerCase(),
    password,
    role,
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
    token,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
    },
    token,
  });
});

export const fetchLoggedInUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      fullname: req.user.fullname,
      email: req.user.email,
      role: req.user.role,
      createdAt: req.user.createdAt,
    },
  });
});
