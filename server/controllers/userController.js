import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Get user profile
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user details", error: err });
  }
};

// Update user details
export const updateUserDetails = async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user", error: err });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!newPassword) {
          return res.status(400).json({ message: "New password is required" });
        }
        
        const user = await User.findById(req.user.id);
        
        // Optional: verify currentPassword matches existing one
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Current password is incorrect" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update and save
        user.password = hashedPassword;
        await user.save();
        
        res.status(200).json({ message: "Password updated successfully" });        
    } catch (error) {
      console.error("Error in resetPassword:", error);
      res.status(500).json({ message: "Server error while resetting password." });
    }
  };
  

export const uploadProfilePicture = async (req, res) => {
    try {
      const userId = req.user.id;
      const profilePicPath = `/uploads/${req.file.filename}`;
  
      const user = await User.findByIdAndUpdate(
        userId,
        { profilePic: profilePicPath },
        { new: true }
      );
  
      res.status(200).json({ message: "Profile picture updated", profilePic: user.profilePic });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload profile picture", error: error.message });
    }
};
    