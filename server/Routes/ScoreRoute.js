const express = require("express");
const router = express.Router();

const {
  addScore,
  getAllScores,
  getScoreById,
  getStats,
} = require("../Controller/ScoreController");

router.post("/score", addScore);
router.get("/getscores", getAllScores);
router.get("/getscorebyid/:userId", getScoreById);
router.get("/stats/:userId", getStats);

module.exports = router;
