const express = require("express");
const { googleLogin, googleCallback, getUserProfile } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
router.get("/profile", verifyToken, getUserProfile);  // ใช้ verifyToken middleware

module.exports = router;
