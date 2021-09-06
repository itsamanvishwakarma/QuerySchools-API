const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    tokenExpiration: {
      type: Date,
      required: true,
      // set default value to current time + 1 Month
      default: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
    dailyLimit: {
      type: Number,
      required: true,
      default: 50,
    },
    dailyLimitExpiration: {
      type: Date,
      required: true,
      // set default value to current time + 1 Day
      default: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  },
  {
    timestamps: true,
  }
);

const TokenModel = mongoose.model("Tokens", tokenSchema);
module.exports = TokenModel;
