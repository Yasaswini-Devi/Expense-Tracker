import User from "../models/User.js";

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
  const { newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.password = newPassword; // Make sure you hash in a pre-save hook
    await user.save();
    res.json({ message: "Password reset successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset password", error: err });
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
    