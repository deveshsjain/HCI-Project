const mongoCollections = require("../config/mongoCollections");
const bankDetailsCollection = mongoCollections.bankdetails;
const uuid = require('uuid/v1');


const exportedMethods = {
    async addBankDetails(accounttype, bankname, amount,accountopendate) {

        if (!accounttype) throw "No trainername provided";
        if (!bankname) throw "No certifications provided";
        if (!amount) throw "No biography provided";
        if (!accountopendate) throw "No biography provided";
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
            addedtrainer,
            newId
        }

    },
}
    module.exports = exportedMethods;