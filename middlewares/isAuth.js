const TokenModel = require("../models/tokenModel");
const sanitize = require("mongo-sanitize");
const logger = require("../middlewares/log");
const isAuth = (req, res, next) => {
  const token = sanitize(req.params.authToken);
  //find  token in database
  TokenModel.findOne({ token: token }, (err, token) => {
    if (err) {
      return res.status(500).send({
        message: "Error in the server",
      });
    }
    if (!token) {
      return res.status(401).send({
        message: "Invalid token",
      });
    }

    //check if token is expired
    if (token.tokenExpiration < Date.now()) {
      return res.status(401).send({
        message: "Token expired create a new one.",
      });
    }

    // check if token.dailyLimitExpiration is less than current time then make token.dailyLimit = 5
    if (token.dailyLimitExpiration < Date.now()) {
      token.dailyLimit = 50;
      token.dailyLimitExpiration = Date.now() + 86400000;
      async function updateToken() {
        try {
          await token.save();
        } catch (err) {
          logger.log({
            level: "error",
            message: err.message,
            timestamp: new Date(),
          });
          return res.status(500).send({
            message: "Error in the servers try later",
          });
        }
      }
      updateToken();
    }

    // check if token.dailyLimit is less than 0 then return error
    if (token.dailyLimit <= 0) {
      return res.status(401).send({
        message: "Daily limit exceeded",
      });
    }
    // check if token.dailyLimit is greater than 0 then decrement token.dailyLimit by 1
    if (token.dailyLimit > 0 && token.dailyLimitExpiration > Date.now()) {
      token.dailyLimit--;
      async function updateToken() {
        try {
          await token.save();
        } catch (err) {
          logger.log({
            level: "error",
            message: err.message,
            timestamp: new Date(),
          });
        }
      }
      updateToken();
    }
    // if all conditions are met then move forward
    next();
  });
};

module.exports = isAuth;
