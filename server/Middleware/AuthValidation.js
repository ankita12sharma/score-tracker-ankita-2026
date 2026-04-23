const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .pattern(/@gmail\.com$/)
      .min(5)
      .max(100)
      .lowercase()
      .required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      responseMessage: "Bad request",
    });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(4).password(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      responseMessage: "Bad request",
      err,
    });
  }
  next();
};

module.exports = { signupValidation, loginValidation };
