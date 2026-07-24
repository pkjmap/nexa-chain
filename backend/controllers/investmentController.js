const Investment = require("../models/Investment");

/**
 * @desc Create Investment
 * @route POST /api/investments
 * @access Private
 */
const createInvestment = async (req, res) => {
    try {
        const {
            investmentAmount,
            planName,
            durationDays,
            dailyROIPercentage,
        } = req.body;

        // Validation
        if (
            !investmentAmount ||
            !planName ||
            !durationDays ||
            !dailyROIPercentage
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        if (investmentAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Investment amount must be greater than zero.",
            });
        }

        const startDate = new Date();

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + Number(durationDays));

        const investment = await Investment.create({
            user: req.user.id,

            investmentAmount,

            planDetails: {
                planName,
                durationDays,
                dailyROIPercentage,
            },

            startDate,
            endDate,

            investmentStatus: "Active",
        });

        return res.status(201).json({
            success: true,
            message: "Investment created successfully.",
            investment,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

/**
 * @desc View Logged-in User Investments
 * @route GET /api/investments
 * @access Private
 */
const getUserInvestments = async (req, res) => {
    try {
        const investments = await Investment.find({
            user: req.user.id,
        })
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json({
            success: true,
            total: investments.length,
            investments,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    createInvestment,
    getUserInvestments,
};