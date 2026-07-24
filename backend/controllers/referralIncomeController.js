const ReferralIncome = require("../models/ReferralIncome");

/**
 * Get Referral Income History
 * GET /api/referral-income
 */

const getReferralIncomeHistory = async (
    req,
    res
) => {
    try {

        const history = await ReferralIncome.find({
            receiver: req.user._id,
        })
            .populate({
                path: "generatedBy",
                select: "fullName email referralCode",
            })
            .sort({
                date: -1,
            })
            .lean();

        res.status(200).json({
            success: true,
            count: history.length,
            history,
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
    getReferralIncomeHistory,
};