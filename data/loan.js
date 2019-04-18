const mongoCollections = require("../config/mongoCollections");
const loanInfo = mongoCollections.loandetails;
const uuid = require('uuid/v1');

const exportedMethods = {
    async addLoanDetails(category,amountdue) {

        if (!category) throw "No category provided";
        if (!amountdue) throw "No amount provided";
        
        const loanCollection = await loanInfo();
        const newLoan = {
            _id: uuid(),
            category: category,
            amountdue: amountdue
        };

        const addedLoan = await loanCollection.insertOne(newLoan);
        const newId = addedLoan.insertedId;

        return {
            status: true,
            addedLoan,
            newId
        }

    },
}
    module.exports = exportedMethods;