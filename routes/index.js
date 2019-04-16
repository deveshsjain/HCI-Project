const homeRoutes = require("./home");
const deposit = require("./deposit");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expenses = require("./expenses");
const dashboard = require("./dashboard");
const constructorMethod = app => {

  app.use(cookieParser());

  app.use(bodyParser.json());
  try {
    app.use("/", homeRoutes);
    app.use("/dashboard", dashboard);
    app.use("/deposit", deposit);
    app.use("/expenses", expenses);

  }
  catch (error) {
    console.log(error);
    app.use("*", (req, res) => {
      res.redirect("/");
    });
  }
};

module.exports = constructorMethod;
