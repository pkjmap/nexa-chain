const mongoose = require("mongoose");

const referralIncomeSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    referralLevel: {
      type: Number,
      required: true,
      min: 1,
    },

    incomeAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for reporting
referralIncomeSchema.index({
  receiver: 1,
  generatedBy: 1,
  referralLevel: 1,
});

module.exports = mongoose.model(
  "ReferralIncome",
  referralIncomeSchema
);