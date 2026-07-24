const User = require("../models/User");
const Investment = require("../models/Investment");

/**
 * @desc Get Dashboard Summary
 * @route GET /api/dashboard
 * @access Private
 */
const getDashboard = async (req, res) => {
    try {
        // Get logged-in user
        const user = await User.findById(req.user.id)
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

module.exports = {
    getDashboard,
};