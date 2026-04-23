const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Score", scoreSchema);
