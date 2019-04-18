const mongoCollections = require("../config/mongoCollections");
const creditCardInfo = mongoCollections.creditCardInfo;
const uuid = require('uuid/v1');

const exportedMethods = {
    async addCreditCardDetails(bankname, amountdue) {

        if (!bankname) throw "No bankname provided";
        if (!amountdue) throw "No amount provided";
        
        const creditCardCollection = await creditCardInfo();
        const newCreditCard = {
            _id: uuid(),
            bankname: bankname,
            amountdue: amountdue
        };

        const addedcreditCard = await creditCardCollection.insertOne(newCreditCard);
        const newId = addedcreditCard.insertedId;

        return {
            status: true,
            addedcreditCard,
            newId
        }

    },
}
    module.exports = exportedMethods;