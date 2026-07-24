const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    investmentAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    planDetails: {
      planName: {
        type: String,
        required: true,
      },

      durationDays: {
        type: Number,
        required: true,
      },

      dailyROIPercentage: {
        type: Number,
        required: true,
      },
    },

    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    endDate: {
      type: Date,
      required: true,
    },

    investmentStatus: {
      type: String,
      enum: ["Active", "Completed", "Cancelled"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Investment", investmentSchema);