const User = require("../models/User");

/**
 * ----------------------------------------
 * Get Direct Referrals
 * GET /api/referrals/direct
 * Private
 * ----------------------------------------
 */
const getDirectReferrals = async (req, res) => {
    try {
        const referrals = await User.find({
            referredBy: req.user.id,
        })
            .select(
                "fullName email mobile referralCode walletBalance accountStatus createdAt"
            )
            .lean();

        return res.status(200).json({
            success: true,
            count: referrals.length,
            referrals,
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
 * ----------------------------------------
 * Recursive Function
 * ----------------------------------------
 */
const buildReferralTree = async (userId) => {
    const referrals = await User.find({
        referredBy: userId,
    })
        .select("fullName email referralCode")
        .lean();

    const tree = [];

    for (const user of referrals) {
        tree.push({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            referralCode: user.referralCode,
            children: await buildReferralTree(user._id),
        });
    }

    return tree;
};

/**
 * ----------------------------------------
 * Get Complete Referral Tree
 * GET /api/referrals/tree
 * Private
 * ----------------------------------------
 */
const getReferralTree = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select("fullName referralCode")
            .lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const tree = await buildReferralTree(req.user.id);

        return res.status(200).json({
            success: true,
            referralTree: {
                id: user._id,
                fullName: user.fullName,
                referralCode: user.referralCode,
                children: tree,
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
    getDirectReferrals,
    getReferralTree,
};