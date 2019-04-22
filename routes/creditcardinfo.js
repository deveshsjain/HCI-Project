const express = require("express");
const router = express.Router();
const data = require("../data");
const creditCardData=data.creditCardInfo;
const session = data.session;
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const xss = require("xss");

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

router.get('/', userAuth,async (req, res) => {
    try {
        
        let clientSessionId=req.cookies.authCookie;
        let userId = await session.getSessionById(clientSessionId);
        if (!userId) throw "Unauthorize access";
       res.render("welcome/creditcardinfo", {
            title: "creditCardInfo",
        });
    } catch (error) {
        console.log(error);
        res.clearCookie("authCookie");
        res.status(403).render('error', {
            title: "Error",
            error: error
        });
    }
});

router.post("/",async (req, res) => {
   
    try {
       
        let creditcardInfo = req.body;
        console.log(creditcardInfo);
        let bankname = xss(creditcardInfo.bankname);
        let amountdue = xss(creditcardInfo.amountdue);

        if (!bankname) {
            res.render("welcome/creditcardinfo", {
                alertMsg: "Please provide bankname",
                title: "creditCardInfo"  , 
            });
            return;
        }
        if (!amountdue) {
            res.render("welcome/creditcardinfo", {
                alertMsg: "Please provide amountdue",
                title: "creditCardInfo"  , 
            });
            return;
        }
        
        await creditCardData.addCreditCardDetails(bankname, amountdue);
        res.redirect("/loan");

    } catch (error) {
        res.render("welcome/creditcardinfo", {
            alertMsg: "error while adding creditcard details",
            title:"creditCardInfo"
        });
    }
});

router.post("/add",async (req, res) => {
   
    try {
       
        let creditcardInfo = req.body;
        console.log(creditcardInfo);
        let bankname = xss(creditcardInfo.bankname);
        let amountdue = xss(creditcardInfo.amountdue);

        if (!bankname) {
            res.render("welcome/creditcardinfo", {
                alertMsg: "Please provide bankname",
                title: "creditCardInfo"  , 
            });
            return;
        }
        if (!amountdue) {
            res.render("welcome/creditcardinfo", {
                alertMsg: "Please provide amountdue",
                title: "creditCardInfo"  , 
            });
            return;
        }
        
        await creditCardData.addCreditCardDetails(bankname, amountdue);
        res.redirect("/creditcardinfo");

    } catch (error) {
        res.render("welcome/creditcardinfo", {
            alertMsg: "error while adding creditcard details",
            title:"creditCardInfo"
        });
    }
});

module.exports = router;