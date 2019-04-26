const mongoCollections = require("../config/mongoCollections");
const bankdetails = mongoCollections.bankdetails;
const userbankdetails = mongoCollections.userbank;
const uuid = require('uuid/v1');


const exportedMethods = {
    async addBankDetails(accounttype, bankname, amount,accountopendate) {

        if (!accounttype) throw "No accounttype provided";
        if (!bankname) throw "No bankname provided";
        if (!amount) throw "No amount provided";
        if (!accountopendate) throw "No accountopendate provided";
        const bankDetailsCollection = await bankdetails();
        const newDetails = {
            _id: uuid(),
            accounttype: accounttype,
            bankname: bankname,
            amount: amount,
            accountopendate: accountopendate
        };

        const addeddetails = await bankDetailsCollection.insertOne(newDetails);
        const newId = addeddetails.insertedId;

        return {
            status: true,
            addeddetails,
            newId
        }

    },

    async addUserAccountDetails(userId,accounttype, bankname, amount,accountopendate) {
        if (!userId) throw "No userId provided";
        if (!accounttype) throw "No accounttype provided";
        if (!bankname) throw "No bankname provided";
        if (!amount) throw "No amount provided";
        if (!accountopendate) throw "No accountopendate provided";
        const userBankDetailsCollection = await userbankdetails();
        const newDetails = {
            _id: uuid(),
            userId:userId,
            accounttype: accounttype,
            bankname: bankname,
            amount: amount,
            accountopendate: accountopendate
        };

        const addeddetails = await userBankDetailsCollection.insertOne(newDetails);
        const newId = addeddetails.insertedId;

        return {
            status: true,
            addeddetails,
            newId
        }

    },

    async getUserBankById(userId) {
        console.log("INside data");
        console.log(userId)
        const userBankDetailsCollection = await userbankdetails();
        const getUserBank = await userBankDetailsCollection.find({userId:{$all : [userId] }});
        console.log(getUserBank)
        return getUserBank;
    },

    async getAllUserBankId(userid) {
        try {if (!userid) throw "You must provide  userid to search for";
 
         let bankArray = [];
         const userBankDetailsCollection = await userbankdetails();
         let userbank = await userBankDetailsCollection.find({ userId: userid }).toArray();
 
         for (let i = 0; i < userbank.length; i++) {
             let userBankDetails = userbank[i];
 
             userBankArray.push(userBankDetails);
 
         }
    // async removeMembership(membershipId) {
    //     if (!membershipId) throw "You must provide an id to delete";

    //     const membershipCollection = await membership();

    //     const removeMembership = await membershipCollection.removeOne({ _id: membershipId });

    //     if (removeMembership.deletedCount === 0) {
    //         throw `Could not delete membership with id: ${membershipId}`;
    //     }
    // },
    // async updateMembership(membershipId,membershipname,membershipperiod,signupfees,services,description) {
    //     if (!membershipId) throw "You must provide an id to update";
    //     const membershipCollection = await membership(); 
    
    //     const updatedMembership = await membershipCollection.updateOne({ _id: membershipId }, 
    //         {$set: 
    //         {   membershipname: membershipname,
    //             membershipperiod: membershipperiod,
    //             signupfees: signupfees,
    //             services: services,
    //             description:description,

    //         } 
    //     });
    //     return updatedMembership;
    // },
    
} catch(e){
        res.status(404).json({error: e});
    }
}
}
    module.exports = exportedMethods;