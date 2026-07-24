const mongoose = require("mongoose");

const User = require("../models/User");
const ReferralIncome = require("../models/ReferralIncome");

/**
 * Referral Commission Percentage
 *
 * Level 1 = 10%
 * Level 2 = 5%
 * Level 3 = 3%
 * Level 4 = 2%
 * Level 5 = 1%
 */

const LEVEL_PERCENTAGES = {
    1: 10,
    2: 5,
    3: 3,
    4: 2,
    5: 1,
};

/**
 * Distribute Referral Income
 *
 * Called whenever a new investment is created.
 *
 * @param {ObjectId} investorId
 * @param {ObjectId} investmentId
 * @param {Number} investmentAmount
 */

const distributeReferralIncome = async (
    investorId,
    investmentId,
    investmentAmount
) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        let currentUser = await User.findById(investorId).session(session);

        let level = 1;

        while (
            currentUser &&
            currentUser.referredBy &&
            LEVEL_PERCENTAGES[level]
        ) {

            const parentUser = await User.findById(
                currentUser.referredBy
            ).session(session);

            if (!parentUser) {
                break;
            }

            /**
             * Prevent Duplicate Commission
             */

            const exists = await ReferralIncome.findOne({
                receiver: parentUser._id,
                generatedBy: investorId,
                investment: investmentId,
                referralLevel: level,
            }).session(session);

            if (!exists) {

                const percentage = LEVEL_PERCENTAGES[level];

                const income =
                    (investmentAmount * percentage) / 100;

                /**
                 * Store Transaction
                 */

                await ReferralIncome.create(
                    [
                        {
                            receiver: parentUser._id,

                            generatedBy: investorId,

                            investment: investmentId,

                            referralLevel: level,

                            incomeAmount: income,

                            date: new Date(),
                        },
                    ],
                    { session }
                );

                /**
                 * Update Wallet
                 */

                await User.findByIdAndUpdate(
                    parentUser._id,
                    {
                        $inc: {
                            walletBalance: income,
                            totalLevelIncomeEarned: income,
                        },
                    },
                    {
                        session,
                    }
                );
            }

            /**
             * Move to Next Parent
             */

            currentUser = parentUser;

            level++;
        }

        await session.commitTransaction();

        session.endSession();

        console.log("Referral Income Distributed Successfully");
    } catch (error) {

        await session.abortTransaction();

        session.endSession();

        console.error(error);

        throw error;
    }
};

/**
 * Get Direct Referrals
 */

const getDirectReferrals = async (userId) => {

    return await User.find({
        referredBy: userId,
    })
        .select("fullName email mobile referralCode")
        .lean();
};

/**
 * Recursive Referral Tree
 */

const buildReferralTree = async (userId) => {

    const children = await User.find({
        referredBy: userId,
    })
        .select("fullName email referralCode")
        .lean();

    const tree = [];

    for (const child of children) {

        tree.push({

            id: child._id,

            fullName: child.fullName,

            email: child.email,

            referralCode: child.referralCode,

            children: await buildReferralTree(child._id),

        });

    }

    return tree;
};

module.exports = {

    distributeReferralIncome,

    getDirectReferrals,

    buildReferralTree,

};