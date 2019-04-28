const express = require("express");
const router = express.Router();
const data = require("../data");
const bankdetailsData=data.bankdetails;
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
       res.render("welcome/bankdetails", {
            title: "bankdetails",
        });
    } catch (error) {
        res.clearCookie("authCookie");
        res.status(403).render('error', {
            title: "Error",
            error: error
        });
    }
});

router.post("/",async (req, res) => {
   
    try {
       
        let bankdetails = req.body;
        let accounttype = xss(bankdetails.accounttype);
        let bankname = xss(bankdetails.bankname);
        let amount = xss(bankdetails.amount);
        let accountopendate = xss(bankdetails.accountopendate);
  

        if (!accounttype) {
            res.render("welcome/bankdetails", {
                alertMsg: "Please provide account type",
                title: "bankdetails"  , 
            });
            return;
        }
        if (!bankname) {
            res.render("welcome/bankdetails", {
                alertMsg: "Please provide bankname",
                title: "bankdetails"  , 
            });
            return;
        }
        if (!amount) {
            res.render("welcome/bankdetails", {
                alertMsg: "Please provide amount",
                title: "bankdetails"  , 
            });
            return;
        }
        if (!accountopendate) {
            res.render("welcomebankdetails", {
                alertMsg: "Please provide account open date",
                title: "bankdetails"  , 
            });
            return;
        }
        await bankdetailsData.addBankDetails(accounttype, bankname, amount, accountopendate);
        res.redirect("/expenses");

    } catch (error) {
        res.render("welcome/bankdetails", {
            alertMsg: "error while adding bankdetails",
            title:"bankdetails"
        });
    }

    
});
router.post("/add",async (req, res) => {
   
    try {
       
        let bankdetails = req.body;
        let accounttype = xss(bankdetails.accounttype);
        let bankname = xss(bankdetails.bankname);
        let amount = xss(bankdetails.amount);
        let accountopendate = xss(bankdetails.accountopendate);
  

        if (!accounttype) {
            res.render("welcome/bankdetails", {
                alertMsg: "Please provide account type",
                title: "bankdetails"  , 
            });
            return;
        }
        if (!bankname) {
            res.render("welcome/bankdetails", {
                alertMsg: "Please provide bankname",
                title: "bankdetails"  , 
            });
            return;
        }
        if (!amount) {
            res.render("welcome/bankdetails", {
                alertMsg: "Please provide amount",
                title: "bankdetails"  , 
            });
            return;
        }
        if (!accountopendate) {
            res.render("welcomebankdetails", {
                alertMsg: "Please provide account open date",
                title: "bankdetails"  , 
            });
            return;
        }
        await bankdetailsData.addBankDetails(accounttype, bankname, amount, accountopendate);
        res.redirect("/bankDetails");

    } catch (error) {
        res.render("welcome/bankdetails", {
            alertMsg: "error while adding bankdetails",
            title:"bankdetails"
        });
    }

});



module.exports = router;
