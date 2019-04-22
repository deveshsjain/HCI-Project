const express = require("express");
const router = express.Router();
const data = require("../data");
const creditCardData=data.creditCardInfo;
const session = data.session;
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const xss = require("xss");



router.get('/',async (req, res) => {
res.render("welcome/viewBudget")
});
module.exports = router;