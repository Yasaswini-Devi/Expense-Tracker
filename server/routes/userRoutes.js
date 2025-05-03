import express from 'express';
import { getUserDetails, updateUserDetails, resetPassword, uploadProfilePicture } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.get("/details", authMiddleware, getUserDetails);
router.put("/update", authMiddleware, updateUserDetails);
router.put("/reset-password", authMiddleware, resetPassword);
router.post("/upload-profile-pic", authMiddleware, upload.single("profilePic"), uploadProfilePicture);

export default router;
