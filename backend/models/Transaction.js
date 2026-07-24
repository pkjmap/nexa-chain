const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        type: {
            type: String,
            enum: [
                "ROI",
                "REFERRAL",
                "DEPOSIT",
                "WITHDRAWAL",
                "INVESTMENT",
            ],
            required: true,
            index: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        referenceId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        status: {
            type: String,
            enum: ["Pending", "Completed", "Cancelled"],
            default: "Completed",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Transaction",
    transactionSchema
);