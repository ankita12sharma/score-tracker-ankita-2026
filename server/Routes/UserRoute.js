const express = require("express");
const { signup, login } = require("../Controller/UserController");
const {
  signupValidation,
  loginValidation,
} = require("../Middleware/AuthValidation");

const router = express.Router();

router.post("/signupuser", signup);
router.post("/loginuser", login);

module.exports = router;
