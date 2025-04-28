import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,  // No duplicate usernames
  },
  email: {
    type: String,
    required: true,
    unique: true,  // No duplicate emails
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  // Minimum password length
  },
}, { timestamps: true });  // createdAt, updatedAt fields

const User = mongoose.model("User", UserSchema);

export default User;