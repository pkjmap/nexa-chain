const express = require("express");

const router = express.Router();

const {
    getReferralIncomeHistory,
} = require("../controllers/referralIncomeController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getReferralIncomeHistory);

module.exports = router;