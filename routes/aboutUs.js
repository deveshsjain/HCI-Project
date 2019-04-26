const express = require("express");
const router = express.Router();
const data = require("../data");
const expensesData = data.expenses;
const session = data.session;
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const xss = require("xss");

router.use(cookieParser());
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    res.render("welcome/aboutus")
});

module.exports = router;