const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Protect Private Routes
 */
const protect = async (req, res, next) => {
    try {
        let token;

        // Check Authorization Header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // No Token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find User
        const user = await User.findById(decoded.id)
            .select("-password")
            .lean();

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        // Check Account Status
        if (user.accountStatus !== "Active") {
            return res.status(403).json({
                success: false,
                message: "Your account is not active.",
            });
        }

        // Attach user to request
        req.user = user;

        next();
    } catch (error) {
        console.error(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

module.exports = protect;