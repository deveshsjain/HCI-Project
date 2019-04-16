const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const homeRoutes = require("./home");
const bankdetails = require("./bankdetails");
const expenses = require("./expenses")
const dashboard = require("./dashboard")
const constructorMethod = app => {

  app.use(cookieParser());

  app.use(bodyParser.json());
  try {
    app.use("/", homeRoutes);
    app.use("/bankdetails", bankdetails);
    app.use("/expenses", expenses);
    app.use("/dashboard", dashboard);
  }
  catch (error) {
    console.log(error);
    app.use("*", (req, res) => {
      res.redirect("/");
    });
  }
};

module.exports = constructorMethod;
