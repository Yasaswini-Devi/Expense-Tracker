import express from 'express';
import { getUserDetails, updateUserDetails, resetPassword } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/details", authMiddleware, getUserDetails);
router.put("/update", authMiddleware, updateUserDetails);
router.put("/reset-password", authMiddleware, resetPassword);

export default router;
