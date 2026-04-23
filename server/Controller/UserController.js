const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/UserModel");

//signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userData = await UserModel.findOne({ email });
    if (userData) {
      return res.status(403).json({
        responseCode: "403",
        responseMessage: "User already exist,you can login!!",
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      responseCode: "201",
      responseMessage: "Signup successfull!!",
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Server error!!",
    });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        responseCode: "404",
        responseMessage: "User does not exist!!",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        responseCode: "403",
        responseMessage: "Invalid email or password!!",
      });
    }
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_Token,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      responseCode: "200",
      responseMessage: "Login successfull!!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Server error!!",
    });
  }
};

module.exports = {
  signup,
  login,
};
