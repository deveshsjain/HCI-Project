const user = require("./user");
const session = require("./session");
const authentication = require("./authentication");
const bankdetails  = require("./bankdetails");
const expenses  = require("./expenses");

module.exports = {
  user: user,
  session: session,
  authentication: authentication,
  bankdetails: bankdetails,
  expenses: expenses
};
