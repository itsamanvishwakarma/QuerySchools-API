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
    //if token is valid
    next();
  });
};

module.exports = isAuth;
