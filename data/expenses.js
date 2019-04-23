const mongoCollections = require("../config/mongoCollections");
const expenses = mongoCollections.expenses;
const userexpenses = mongoCollections.userexpense;
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
    async addUserExpensesDetails(userId,category, title, amount, modeofpayment, date, comments) {
        if (!userId) throw "No userId provided";
        if (!category) throw "No category provided";
        if (!title) throw "No title provided";
        if (!amount) throw "No amount provided";
        if (!modeofpayment) throw "No modeofpayment provided";
        if (!date) throw "No date provided";
        if (!comments) throw "No comments provided";
        const userexpensesCollection = await userexpenses();
        const newUserExpense = {
            _id: uuid(),
            userId:userId,
            category: category,
            title: title,
            amount: amount,
            modeofpayment: modeofpayment,
            date: date,
            comments: comments
        };

        const addeduserexpense = await userexpensesCollection.insertOne(newUserExpense);
        const newId = addeduserexpense.insertedId;

        return {
            status: true,
            addedexpense,
            newId
        }

    },
}
    module.exports = exportedMethods;