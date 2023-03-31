const functions = require('firebase-functions');
const app = require('express')();

const {
     getAllTransactions,
     postAllTransaction,
     editAllTransaction,
     deleteAllTransaction
} = require('./APIs/controllers/controllerTransaction')

app.get('/todos/:month', getAllTransactions);
app.post('/createTransaction', postAllTransaction);
app.put('/editTransaction/:idTransaction', editAllTransaction);
app.delete('/deleteTransaction/:idTransaction', deleteAllTransaction);

exports.api = functions.https.onRequest(app);