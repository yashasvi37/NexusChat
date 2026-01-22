import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { aj } from "../lib/arcjet.js";

const router = express.Router();

// Define Arcjet middleware specifically for auth
const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 }); // Deduct 1 token

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Too many requests" });
            }
            if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Bot detected" });
            }
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    } catch (error) {
        console.log("Arcjet error", error);
        // Fail open or closed depending on requirements. Usually fail open for availability unless critical.
        // For security app, maybe fail closed? But allow for now to specific routes?
        // Let's pass to next() but log it, or simple return error.
        next(error);
    }
};

router.post("/signup", signup);
router.post("/login", arcjetMiddleware, login); // Protect login specifically with rate limit
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
