const express = require("express");
const router = express.Router();
const data = require("../data");
const user = data.user;
const authentication=data.authentication;
const activityData = data.activity;
const noticeData = data.notice;
const session = data.session;
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const cookieParser = require("cookie-parser");

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
        // userdetail = await user.getUserById(userId);
        // let activity = await activityData.getAllActivities();
        // let notice = await noticeData.getAllNotices();
        // let trainerCount = (await user.getUserNameByRole("TRAINER")).length;
        // let gymMemberCount = (await user.getUserNameByRole("gymMember")).length;
        // let d = new Date();
        // let date = d.getUTCDate();
        // let year = d.getUTCFullYear();
        // let monthNames = ["January", "February", "March", "April", "May", "June",
        // "July", "August", "September", "October", "November", "December"
        // ];
        // let month = monthNames[d.getUTCMonth()];

        res.render("welcome/deposit", {
            title: "Dashboard",
            // firstname: userdetail.firstname,
            // lastname: userdetail.lastname,
            // activity:activity,
            // notice:notice,
            // trainerCount:trainerCount,
            // gymMemberCount:gymMemberCount,
            // layout:layout,
            // month:month,
            // date:date,
            // year:year

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
router.get('/logout', function (req, res) {
    res.clearCookie("authCookie");
    res.render("logout", {
        layout: "index",
        title: "Logout"
    });
});

module.exports = router;
