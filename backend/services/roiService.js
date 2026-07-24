const mongoose = require("mongoose");

const Investment = require("../models/Investment");
const ROIHistory = require("../models/ROIHistory");
const User = require("../models/User");

/**
 * Generate Daily ROI for all active investments
 *
 * This function should be executed once every day
 * using a cron job.
 */
const distributeDailyROI = async () => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        // Today's date (00:00:00)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Find all active investments
        const investments = await Investment.find({
            investmentStatus: "Active",
            startDate: { $lte: today },
        }).session(session);

        for (const investment of investments) {

            /**
             * Skip expired investments
             */
            if (investment.endDate < today) {

                investment.investmentStatus = "Completed";

                await investment.save({ session });

                continue;
            }

            /**
             * Prevent duplicate ROI generation
             */
            const exists = await ROIHistory.findOne({
                investment: investment._id,
                date: today,
            }).session(session);

            if (exists) {
                continue;
            }

            /**
             * Daily ROI Formula
             */
            const roiAmount =
                (investment.investmentAmount *
                    investment.planDetails.dailyROIPercentage) /
                100;

            /**
             * Save ROI History
             */
            await ROIHistory.create(
                [
                    {
                        user: investment.user,
                        investment: investment._id,
                        roiAmount,
                        date: today,
                        status: "Paid",
                    },
                ],
                { session }
            );

            /**
             * Update User Wallet
             */
            await User.findByIdAndUpdate(
                investment.user,
                {
                    $inc: {
                        walletBalance: roiAmount,
                        totalROIEarned: roiAmount,
                    },
                },
                { session }
            );
        }

        await session.commitTransaction();
        session.endSession();

        console.log("✅ Daily ROI distributed successfully.");

    } catch (error) {

        await session.abortTransaction();
        session.endSession();

        console.error("ROI Distribution Error:", error);

        throw error;
    }
};

/**
 * Get ROI History of a User
 *
 * @param {ObjectId} userId
 */
const getUserROIHistory = async (userId) => {

    return await ROIHistory.find({
        user: userId,
    })
        .populate("investment", "investmentAmount planDetails")
        .sort({ date: -1 })
        .lean();
};

/**
 * Get ROI History for a Specific Investment
 *
 * @param {ObjectId} investmentId
 */
const getInvestmentROIHistory = async (investmentId) => {

    return await ROIHistory.find({
        investment: investmentId,
    })
        .sort({ date: -1 })
        .lean();
};

module.exports = {

    distributeDailyROI,

    getUserROIHistory,

    getInvestmentROIHistory,

};