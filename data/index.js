const user = require("./user");
const session = require("./session");
const authentication = require("./authentication");
const bankdetails  = require("./bankdetails");
const expenses  = require("./expenses");
const creditCardInfo  = require("./creditCardInfo");
const loandetails  = require("./loan");

module.exports = {
  user: user,
  session: session,
  authentication: authentication,
  bankdetails: bankdetails,
  expenses: expenses,
  creditCardInfo: creditCardInfo,
  loandetails:loandetails
};
