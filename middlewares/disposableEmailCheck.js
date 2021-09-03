tempEmailList = require("../data/disposableMails");

const checkForDisposableEmail = (email) => {
  // check if email is in the tempEmailList.default
  if (tempEmailList.default.includes(email)) {
    return true;
  }
};

module.exports = checkForDisposableEmail;
