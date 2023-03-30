const transactionsModel = require("../models/modelTransaction");


exports.getAllTransactions = async (request, response) => {
    try{
        const month = request.body.month;
        const transactions = await transactionsModel.getTransactions(month);
        return response.json(transactions)

    }catch(err){
        return response.status(500).json({ error: err.code });
    }    
};

exports.postAllTransaction = async(request, response) =>{
    try {
        const newTransaction = {
        title: request.body.title,
        expense: request.body.expense,
        month: request.body.month,
        money: request.body.value,
        createdAt: new Date().toISOString()
        } 
        await transactionsModel.postTransactions(newTransaction);
        let message = "Transação cadastrada com sucesso"
        response.status(201).json(message);
    } catch (error) {
        response.status(500).json(error);
    }
}


exports.editAllTransaction = async (request, response) => {
    try {
        await transactionsModel.editAllTransaction(request.params.idTransaction, request.body);
        response.json({ message: 'Updated successfully' });
    } catch (error) {
        if (error.code === 5) {
            response.status(404).json({ message: 'Not Found' });
        }
        console.error(error);
        response.status(500).json({ error: error.code });
    }
}  

exports.deleteAllTransaction = (request, response) => {
        transactionsModel.deleteTransaction(request.params.idTransaction)
            .then(() => {
                response.json({ message: 'Delete successful' });
            })
            .catch((err) => {
                console.error(err);
                return response.status(500).json({ 
                    error: err.code 
                });
            });
    };
