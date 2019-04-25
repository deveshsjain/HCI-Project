const express = require("express");
const router = express.Router();
const data = require("../data");
const session = data.session;
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const xss = require("xss");
const bankDetailsData = data.bankdetails;
const creditCardData=data.creditCardInfo;
const expensesData = data.expenses;


router.use(cookieParser());
router.use(bodyParser.json());

const userAuth = function (req, res, next) {

    if (!req.cookies.authCookie) {
        res.status(403).render("error", {
            title: "Error",
            error: " User is not logged in !"
        });
    } else {
        next();
    }
};
router.get('/',async (req, res) => {
    try {
        let userrId = req.cookies.userId;
        // let clientSessionId=req.cookies.authCookie;
        // let userId = await session.getSessionById(clientSessionId);
        // if (!userId) throw "Unauthorize access";
        const bankDetails=await bankDetailsData.getUserBankById(userrId);
        console.log(bankDetails);
       res.render("welcome/viewBudget", {
           bankDetails:bankDetails,
            title: "viewBudget"
        });
    } catch (error) {
        res.clearCookie("authCookie");
        res.status(403).render('error', {
            title: "Error",
            error: error
        });
    }
});

module.exports = router;