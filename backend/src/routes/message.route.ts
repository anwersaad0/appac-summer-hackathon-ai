import express from 'express';
import { getUsersForSideBar, sendMessage, getMessages } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// These start with /api/messages
router.get("/conversations", protectRoute, getUsersForSideBar);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessages);


export default router;