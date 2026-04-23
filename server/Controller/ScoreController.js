const mongoose = require("mongoose");
const Score = require("../Model/ScoreModel");

const addScore = async (req, res) => {
  try {
    const { userId, score, date } = req.body;

    if (!userId || !score || !date) {
      return res.status(400).json({
        responseCode: "400",
        responseMessage: "All fields required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        responseCode: "400",
        responseMessage: "Invalid userId",
      });
    }
    const newScore = await Score.create({
      userId: new mongoose.Types.ObjectId(userId),
      score,
      date,
    });
    // console.log("SAVED:", newScore);
    res.status(201).json({
      responseCode: "201",
      responseMessage: "Record added successfully!!",
      data: newScore,
    });
  } catch (err) {
    // console.log("ADD ERROR:", err);
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Error adding score",
    });
  }
};

const getAllScores = async (req, res) => {
  try {
    let scores = await Score.find({});

    res.status(200).json({
      responseCode: "200",
      responseMessage: "Scores fetched successfully!!",
      data: scores,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Server error!!",
    });
  }
};

const getScoreById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        responseCode: "400",
        responseMessage: "Invalid userId!!",
      });
    }

    const scores = await Score.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    res.status(200).json({
      responseCode: "200",
      responseMessage: "Scores fetched successfully!!",
      data: scores,
    });
  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Server error!!",
    });
  }
};

const getStats = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        responseCode: "400",
        responseMessage: "UserId required!!",
      });
    }
    const scores = await Score.find({
      $expr: {
        $eq: [{ $toString: "$userId" }, userId],
      },
    }).sort({ createdAt: -1 });

    const total = scores.length;

    const latest = total > 0 ? scores[0].score : 0;

    const avg =
      total > 0
        ? (
            scores.reduce((sum, item) => sum + Number(item.score), 0) / total
          ).toFixed(1)
        : 0;
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Data fetched sucessfully!!",
      data: {
        total,
        latest,
        avg,
      },
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Server error",
    });
  }
};
module.exports = {
  addScore,
  getAllScores,
  getScoreById,
  getStats,
};
