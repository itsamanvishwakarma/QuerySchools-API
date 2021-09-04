const TokenModel = require("../models/tokenModel");
const sanitize = require("mongo-sanitize");
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
    // check if token.dailyLimitExpiration is less than current time then make token.dailyLimit = 5
    let check = false;
    if (token.dailyLimitExpiration < Date.now()) {
      token.dailyLimit = 5;
      token.dailyLimitExpiration = Date.now() + 86400000;
      check = true;
      async function saveToken() {
        await token.save();
      }
      saveToken();
    }
    // check if token.dailyLimit is less than 0 then return error
    if (token.dailyLimit <= 0) {
      return res.status(401).send({
        message: "Daily limit exceeded",
      });
    }
    // check if token.dailyLimit is greater than 0 then decrement token.dailyLimit by 1
    if (token.dailyLimit > 0 && check == false) {
      token.dailyLimit--;
      async function saveToken() {
        await token.save();
      }
      saveToken();
    }

    next();
  });
};

module.exports = isAuth;
