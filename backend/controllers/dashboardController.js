const User = require("../models/User");
const Investment = require("../models/Investment");
const ROIHistory = require("../models/ROIHistory");
/**
 * @desc Get Dashboard Summary
 * @route GET /api/dashboard
 * @access Private
 */
const getDashboard = async (req, res) => {
    try {
        // Get logged-in user
        const user = await User.findById(req.user._id)
            .select(
                "walletBalance totalROIEarned totalLevelIncomeEarned"
            )
            .lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Calculate total investments
        const investmentSummary = await Investment.aggregate([
            {
                $match: {
                    user: user._id,
                },
            },
            {
                $group: {
                    _id: null,
                    totalInvestments: {
                        $sum: "$investmentAmount",
                    },
                },
            },
        ]);

        const totalInvestments =
            investmentSummary.length > 0
                ? investmentSummary[0].totalInvestments
                : 0;

        return res.status(200).json({
            success: true,
            dashboard: {
                totalInvestments,
                totalROIEarned: user.totalROIEarned,
                totalLevelIncomeEarned:
                    user.totalLevelIncomeEarned,
                walletBalance: user.walletBalance,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
const getDashboardChart = async (req, res) => {
    try {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 30);

        const chart = await ROIHistory.aggregate([
            {
                $match: {
                    user: req.user._id,
                    date: {
                        $gte: fromDate,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%d-%m",
                            date: "$date",
                        },
                    },
                    earnings: {
                        $sum: "$roiAmount",
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);

        res.json({
            success: true,
            chart,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    getDashboard,
    getDashboardChart,
};