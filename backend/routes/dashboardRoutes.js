const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
    getDashboard,
    getDashboardChart,
} = require("../controllers/dashboardController");

/**
 * @route   GET /api/dashboard
 * @desc    Get logged-in user's dashboard summary
 * @access  Private
 */
router.get("/", protect, getDashboard);
router.get("/chart", protect, getDashboardChart);
module.exports = router;