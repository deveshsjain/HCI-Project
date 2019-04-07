const bcrypt = require("bcrypt");
const user = require("./user");
const session = require("./session");

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
    
};

module.exports = exportedMethods;
