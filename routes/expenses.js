const express = require("express");
const router = express.Router();
const data = require("../data");
const expensesData=data.expenses;
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
       res.render("welcome/expenses", {
            title: "expenses",
        });
    } catch (error) {
        console.log(error);
        res.clearCookie("authCookie");
        res.status(403).render('error', {
            // layout: "index",
            title: "Error",
            error: error
        });
    }
});


router.post("/",async (req, res) => {
   
    try {
       
        let expenses = req.body;
        console.log(expenses);
        let category = xss(expenses.category);
        let title = xss(expenses.title);
        let amount = xss(expenses.amount);
        let modeofpayment = xss(expenses.modeofpayment);
        let date = xss(expenses.date);
        let comments = xss(expenses.comments);

        if (!category) {
            res.render("welcome/expenses", {
                alertMsg: "Please provide category",
                title: "expenses"  , 
            });
            return;
        }
        if (!title) {
            res.render("welcome/expenses", {
                alertMsg: "Please provide title",
                title: "expenses"  , 
            });
            return;
        }
        if (!amount) {
            res.render("welcome/expenses", {
                alertMsg: "Please provide amount",
                title: "expenses"  , 
            });
            return;
        }
        if (!modeofpayment) {
            res.render("welcome/expenses", {
                alertMsg: "Please provide modeofpayment",
                title: "expenses"  , 
            });
            return;
        }
        if (!date) {
            res.render("welcome/expenses", {
                alertMsg: "Please provide date",
                title: "expenses"  , 
            });
            return;
        }
        if (!comments) {
            res.render("welcome/expenses", {
                alertMsg: "Please provide comments",
                title: "expenses"  , 
            });
            return;
        }
        await expensesData.addExpensesDetails(category, title, amount, modeofpayment, date, comments);
        res.redirect("/creditcardinfo");

    } catch (error) {
        res.render("welcome/expenses", {
            alertMsg: "error while adding expenses",
            title:"expenses"
        });
    }
});

router.post("/add",async (req, res) => {
   
    try {
       
        let expenses = req.body;
        console.log(expenses);
        let category = xss(expenses.category);
        let title = xss(expenses.title);
        let amount = xss(expenses.amount);
        let modeofpayment = xss(expenses.modeofpayment);
        let date = xss(expenses.date);
        let comments = xss(expenses.comments);

        if (!category) {
            res.render("welcome/expenses", {
                alertMsg: "Please provide category",
                title: "expenses"  , 
            });
            return;
        }
        if (!title) {
            res.render("welcome/expenses", {
                alertMsg: "Please provide title",
                title: "expenses"  , 
            });
            return;
        }
        if (!amount) {
            res.render("welcome/expenses", {
                alertMsg: "Please provide amount",
                title: "expenses"  , 
            });
            return;
        }
        if (!modeofpayment) {
            res.render("welcome/expenses", {
                alertMsg: "Please provide modeofpayment",
                title: "expenses"  , 
            });
            return;
        }
        if (!date) {
            res.render("welcome/expenses", {
                alertMsg: "Please provide date",
                title: "expenses"  , 
            });
            return;
        }
        if (!comments) {
            res.render("welcome/expenses", {
                alertMsg: "Please provide comments",
                title: "expenses"  , 
            });
            return;
        }
        await expensesData.addExpensesDetails(category, title, amount, modeofpayment, date, comments);
        res.redirect("/expenses");

    } catch (error) {
        res.render("welcome/expenses", {
            alertMsg: "error while adding expenses",
            title:"expenses"
        });
    }
});


module.exports = router;
