const express = require("express");
const router = express.Router();
const data = require("../data");
const creditCardData=data.creditCardInfo;
const session = data.session;
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const xss = require("xss");
const expensesData = data.expenses;



router.get('/',async (req, res) => {
    let userId=(req.cookies.userId)
    let expenses= await expensesData.getUserExpenses(userId);
    console.log(userId)
res.render("welcome/viewBudget",{category: expenses})
});

module.exports = router;