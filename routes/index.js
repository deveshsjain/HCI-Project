// const resultRoutes = require("./result");
// const path = require("path");

// const constructorMethod = app => {
//     app.use(bodyParser.json());
//     app.use("/", resultRoutes);
//    // app.use("/howitworks", resultRoutes)
    
//     app.use("*", (req, res) => {
//         res.redirect("/result");
//     });
// };

// module.exports = constructorMethod;



const homeRoutes = require("./home");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const constructorMethod = app => {

  app.use(cookieParser());

  app.use(bodyParser.json());
  try {
    app.use("/", homeRoutes);

  }
  catch (error) {
    console.log(error);
    app.use("*", (req, res) => {
      res.redirect("/");
    });
  }
};

module.exports = constructorMethod;
