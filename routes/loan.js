const express = require("express");
const router = express.Router();
const data = require("../data");
const loanData=data.loandetails;
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
       res.render("welcome/loan", {
            title: "loan",
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
       
        let loandetails = req.body;
        console.log(loandetails);
        let category = xss(loandetails.category);
        let amountdue = xss(loandetails.amountdue);

  

        if (!category) {
            res.render("welcome/loan", {
                alertMsg: "Please provide category",
                title: "loan"  , 
            });
            return;
        }
        if (!amountdue) {
            res.render("welcome/loan", {
                alertMsg: "Please provide amount",
                title: "loan"  , 
            });
            return;
        }
        
        await loanData.addLoanDetails(category, amountdue);
        res.redirect("/bankdetails");

    } catch (error) {
        res.render("welcome/loan", {
            alertMsg: "error while adding loan",
            title:"loan"
        });
    }
});

module.exports = router;


