import express from 'express';
const router = express.Router();
import { signup, login, logout, getMe  } from '../controllers/auth.controller.js';
import protectRoute from '../middleware/protectRoute.js';

// These start with /api/auth
router.get("/me", protectRoute, getMe);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);



export default router;