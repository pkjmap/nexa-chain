const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = require("../utils/generateToken");
/**
 * @desc Register User
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = async (req, res) => {
    try {
        const {
            fullName,
            email,
            mobile,
            password,
            referredBy,
        } = req.body;

        // Check required fields
        if (!fullName || !email || !mobile || !password) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided.",
            });
        }

        // Email exists
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email already registered.",
            });
        }

        // Mobile exists
        const mobileExists = await User.findOne({ mobile });

        if (mobileExists) {
            return res.status(400).json({
                success: false,
                message: "Mobile number already registered.",
            });
        }

        let parentUser = null;

        // Validate referral code if supplied
        if (referredBy) {
            parentUser = await User.findOne({
                referralCode: referredBy,
            });

            if (!parentUser) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid referral code.",
                });
            }
        }

        // Generate unique referral code
        const referralCode =
            "REF" +
            Math.random()
                .toString(36)
                .substring(2, 8)
                .toUpperCase();

        // Create User
        const user = await User.create({
            fullName,
            email,
            mobile,
            password,
            referralCode,
            referredBy: parentUser ? parentUser._id : null,
        });

        return res.status(201).json({
            success: true,
            message: "Registration successful.",
            token: generateToken(user._id),
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                referralCode: user.referralCode,
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

/**
 * @desc Login User
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        // Find user
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // Check account status
        if (user.accountStatus !== "Active") {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token: generateToken(user._id),
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                walletBalance: user.walletBalance,
                totalROIEarned: user.totalROIEarned,
                totalLevelIncomeEarned:
                    user.totalLevelIncomeEarned,
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
    registerUser,
    loginUser,
};