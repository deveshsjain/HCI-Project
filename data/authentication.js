const bcrypt = require("bcrypt");
const user = require("./user");
const session = require("./session");
const mongoCollections = require("../config/mongoCollections");
const signupdetails = mongoCollections.signupdetails;
const uuid = require('uuid/v1');


let exportedMethods = {

    async authenticateUser(username, password) {

        let hashedPassword = null;

        if (username == null || password == null) throw "unauthorized acess";

        else {
            try {
                let userDetails = await user.getUserByUsername(username);
                hashedPassword = userDetails.password;
                let compareToMatch = false;

                compareToMatch = await bcrypt.compare(password, hashedPassword);

                if (compareToMatch) {
                    userId = (await user.getUserByUsername(username))._id;
                    return userId;
                } else return undefined;

            } catch (e) {
                console.log("Error while comparing the password: " + e);
            }
        }
    },
    async authenticateSession(sessionId) {

        if (sessionId == null) throw "sessionId empty";
        else {
            try {
                let sessionDetails = await session.getSessionById(sessionId);
                userId = sessionDetails.userId;
                return userId;
            } catch (e) {
                console.log("Error while authenticating session: " + e);

            }
        }
    },


    async addSignUpDetails(yourname, youremail, yourpassword) {

        if (!yourname) throw "No name provided";
        if (!youremail) throw "No username provided";
        if (!yourpassword) throw "No password provided";
       
        const signUpDetailsCollection = await signupdetails();
        const newDetails = {
            _id: uuid(),
            yourname: yourname,
            youremail: youremail,
            yourpassword: yourpassword         
        };

        const addeddetails = await signUpDetailsCollection.insertOne(newDetails);
        const newId = addeddetails.insertedId;

        return {
            status: true,
            addeddetails,
            newId
        }

    },
    
};


module.exports = exportedMethods;
