const mongoose = require("mongoose");

const roiHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    investment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investment",
      required: true,
      index: true,
    },

    roiAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    date: {
      type: Date,
      default: Date.now,
      index: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Cancelled"],
      default: "Pending",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate ROI records for the same investment on the same day
roiHistorySchema.index(
  { investment: 1, date: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "ROIHistory",
  roiHistorySchema
);