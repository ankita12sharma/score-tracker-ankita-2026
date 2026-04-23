const UserModel = require("../Model/UserModel");
const Draw = require("../Model/DrawModel");

const runDraw = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (users.length === 0) {
      return res.status(404).json({
        responseCode: "404",
        responseMessage: "No users available for draw!!",
      });
    }

    const randomIndex = Math.floor(Math.random() * users.length);
    const winner = users[randomIndex];

    // save draw result
    const drawResult = await Draw.create({
      winnerId: winner._id,
      winnerName: winner.name,
      month: new Date().toLocaleString("default", { month: "long" }),
    });

    res.status(200).json({
      responseCode: "200",
      responseMessage: "Draw completed successfully!!",
      data: drawResult,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Server error!!",
    });
  }
};

module.exports = {
  runDraw,
};
