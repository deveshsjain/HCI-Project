const bcrypt = require("bcrypt");
const mongoCollections = require("../config/mongoCollections");
const session = mongoCollections.session;
const uuid = require('uuid/v1');
var ObjectId = require('mongodb').ObjectID

let exportedMethods = {

    async createSession(cookieName, cookieValue, userId) {

        const sessionCollection = await session();
        const newSession = {
            _id: cookieValue,
            cookieName: cookieName,
            cookieValue: cookieValue,
            userId: userId,
            createDate: new Date(),
        };
        const addedSession = await sessionCollection.insertOne(newSession);
        if (addedSession.insertedCount === 0) {
            throw "Could not add Session successfully";
        } else {
            return true;
        }

    },
    async updateSession(sessionId, updateSession) {

        return this.getSessionById(sessionId).then(currentSession => {
            let updateCommand = {
                $set: updateSession
            };
            return session().then(sessionCollection => {
                return sessionCollection.updateOne({
                    _id: sessionId
                }, updateCommand).then(() => {
                    return this.getsessionById(id);;
                });
            });
        });
    },

    async deleteSession(sessionId) {
        try{
        return session().then(sessionCollection => {
            return sessionCollection.removeOne({
                _id: sessionId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete session with id of ${_id}`;
                }
            });
        });}
        catch(err){
            console.log(err);
            
        }
    },
    async getSessionById(sessionId) {
        return session().then(sessionCollection => {
            return sessionCollection.findOne({
                _id:sessionId
            }).then(session => {
                if (!session) throw "session not found";
                else return session.userId;
            });
        });
    },
    async getSessionByUserId(userId) {

        return session().then(sessionCollection => {
            return sessionCollection.findOne({
                userId: userId
            }).then(session => {
                if (!session) return false;
                else return session;
            });
        });
    }
};

module.exports = exportedMethods;