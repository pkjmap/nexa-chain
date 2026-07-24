const express = require("express");

const router = express.Router();

const {
    getROIHistory,
} = require("../controllers/roiController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getROIHistory);

module.exports = router;