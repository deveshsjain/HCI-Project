const resultRoutes = require("./result");
const path = require("path");

const constructorMethod = app => {
    app.use("/", resultRoutes);
   // app.use("/howitworks", resultRoutes)
    
    app.use("*", (req, res) => {
        res.redirect("/result");
    });
};

module.exports = constructorMethod;