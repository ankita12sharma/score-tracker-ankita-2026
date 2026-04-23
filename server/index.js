const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const UserRouter = require("./Routes/UserRoute");
const scoreRouter = require("./Routes/ScoreRoute");
const drawRouter = require("./Routes/DrawRoute");

const app = express();
const PORT = 8086;

mongoose
  .connect(process.env.MONGO_CONN)
  .then(() => console.log("Connected to MongoDB succesfully!!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.json());
app.use(cors());

app.use("/", UserRouter);
app.use("/", scoreRouter);
app.use("/", drawRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
