const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema(
  {
    winnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    winnerName: String,
    month: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Draw", drawSchema);
