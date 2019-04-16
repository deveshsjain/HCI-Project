const mongoCollections = require("../config/mongoCollections");
const expenses = mongoCollections.expenses;
const uuid = require('uuid/v1');


const exportedMethods = {
    async addExpensesDetails(category, title, amount,modeofpayment,date,comments) {

        if (!category) throw "No category provided";
        if (!title) throw "No title provided";
        if (!amount) throw "No amount provided";
        if (!modeofpayment) throw "No modeofpayment provided";
        if (!date) throw "No date provided";
        if (!comments) throw "No comments provided";
        const expensesCollection = await expenses();
        const newExpense = {
            _id: uuid(),
            category: category,
            title: title,
            amount: amount,
            modeofpayment: modeofpayment,
            date:date,
            comments:comments
        };

        const addedexpense = await expensesCollection.insertOne(newExpense);
        const newId = addedexpense.insertedId;

        return {
            status: true,
            addedexpense,
            newId
        }

    },
}
    module.exports = exportedMethods;