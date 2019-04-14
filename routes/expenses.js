const express = require("express");
const router = express.Router();
const data = require("../data");


router.get("/expenses", (req, res) => {
    res.render('welcome/expenses');
});

module.exports = router;
