const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const TokenModel = require("../models/tokenModel");
const sanitize = require("mongo-sanitize");
const disposableEmailCheck = require("../middlewares/disposableEmailCheck");
const tokenRouter = express.Router();
const logger = require("../middlewares/log");
tokenRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    res.send("Token route");
  })
);

tokenRouter.post(
  "/create",
  expressAsyncHandler(async (req, res) => {
    // sanitize the email to remove any malicious code
    const email = sanitize(req.body.email);
    // check for email validation
    if (!email) {
      return res.status(400).send({
        status: "error",
        message: "Email is required",
      });
    }
    // check for email contains @
    if (typeof email !== "string" || !email.includes("@")) {
      return res.status(400).send({
        status: "error",
        message: "Email is not valid",
      });
    }
    // verify email domain
    const emailDomain = email.split("@")[1];
    if (disposableEmailCheck(emailDomain)) {
      return res.status(400).send({
        status: "error",
        message: "Email domain is not allowed",
      });
    }

    // check for email existence
    const userEmail = await TokenModel.findOne({ email });
    if (userEmail) {
      return res.status(400).send({
        status: "error",
        message: "Email already exists",
      });
    }

    // generate 11 digit alphanumeric token
    const token = Math.random().toString(36).substr(2, 12);
    try {
      const user = new TokenModel({
        email: email,
        token: token,
      });
      const savedUser = await user.save();
      res
        .status(200)
        .send({ message: "Token generated successfully", data: savedUser });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: "Error occurred while generating token",
      });
      // log the error
      logger.log({
        level: "error",
        message: error.message,
        timestamp: new Date(),
      });
    }
  })
);

module.exports = tokenRouter;
