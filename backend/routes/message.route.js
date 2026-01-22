import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage, getGroupMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.get("/group/:groupId", protectRoute, getGroupMessages);

router.post("/send/:id", protectRoute, sendMessage); // For DMs
router.post("/send-group", protectRoute, sendMessage); // For Groups, id optional or passed in body

export default router;
