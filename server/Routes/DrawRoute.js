const express = require("express");
const router = express.Router();

const { runDraw } = require("../Controller/DrawController");

router.post("/draw", runDraw);

module.exports = router;
