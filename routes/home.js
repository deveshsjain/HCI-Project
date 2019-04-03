const express = require("express");
const router = express.Router();
const styling1 = "./node_modules/jquery/dist/jquery.min.js"
const styling2 = "./node_modules/bootstrap/dist/js/bootstrap.min.js"

router.get("/", (req, res) => {
    res.render('welcome/index');
});

router.get("/howitworks", (req, res) => {
    res.render('welcome/howitworks');
});

module.exports = router;
