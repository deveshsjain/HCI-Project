const mongoCollections = require("../config/mongoCollections");
const bankdetails = mongoCollections.bankdetails;
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
}
    module.exports = exportedMethods;