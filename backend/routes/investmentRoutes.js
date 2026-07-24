const express = require("express");
const router = express.Router();

const {
    createInvestment,
    getUserInvestments,
} = require("../controllers/investmentController");

const protect = require("../middleware/authMiddleware");

/**
 * @route   POST /api/investments
 * @desc    Create a new investment
 * @access  Private
 */
router.post("/", protect, createInvestment);

/**
 * @route   GET /api/investments
 * @desc    Get all investments of logged-in user
 * @access  Private
 */
router.get("/", protect, getUserInvestments);

module.exports = router;