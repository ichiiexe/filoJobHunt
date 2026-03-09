import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    console.log(req.body);

    if (!password || password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser)
      return res.status(400).json({ message: "email already in use" });

    // let avatar;
    // if (req.file?.buffer) {
    //   try {
    //     const result = await uploadToCloudinary(req.file.buffer, 'avatars');
    //     avatar = { url: result.secure_url, public_id: result.public_id };
    //   } catch (err) {
    //     console.error('Cloudinary upload failed:', err);
    //     return res.status(500).json({ message: 'Avatar upload failed' });
    //   }
    // }

    const user = new User({
      fullname,
      email: email.toLowerCase(),
      password,
      //   ...(avatar && { avatar }),
      role,
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        // avatar: user.avatar,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const fetchLoggedInUser = async (req, res) => {
//   res.json({
//     user: {
//       id: req.user._id,
//       username: req.user.username,
//       name: req.user.name,
//       email: req.user.email,
//       avatar: req.user.avatar,
//       role: req.user.role,
//       createdAt: req.user.createdAt,
//     },
//   });
// };

// export const updateUserProfile = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const allowedFields = ["username", "name", "email", "profile"];
//     const updates = {};

//     allowedFields.forEach((field) => {
//       if (req.body[field] !== undefined) {
//         updates[field] = req.body[field];
//       }
//     });

//     if (req.file?.buffer) {
//       const user = await User.findById(userId);

//       if (user.avatar?.public_id) {
//         await deleteFromCloudinary(user.avatar.public_id);
//       }

//       const result = await uploadToCloudinary(req.file.buffer, "avatars");
//       updates.avatar = {
//         url: result.secure_url,
//         public_id: result.public_id,
//       };
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId, updates, {
//       new: true,
//       runValidators: true,
//       select: "-password",
//     });

//     res.status(200).json({
//       user: updatedUser,
//       message: "Profile updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updatePassword = async (req, res) => {
//   const { currentPassword, newPassword } = req.body;

//   const user = await User.findById(req.user._id).select("+password");

//   const isMatch = await user.comparePassword(currentPassword);
//   if (!isMatch) {
//     return res.status(401).json({ message: "Current password incorrect" });
//   }

//   user.password = newPassword;
//   await user.save();

//   res.json({ message: "Password updated successfully" });
// };
