const { db } = require('../configs/admin');

class transactionsModel {

    static async getTransactions(month) {
        let transactions = [];
        const querySnapshot = await db
            .collection("transactions")
            .where("month", "==", month)
            .orderBy("createdAt", "desc")
            .get();

        querySnapshot.forEach((doc) => {
            transactions.push({
                transactionId: doc.id,
                title: doc.data().title,
                value:doc.data().money,
                tipe: doc.data().expense,
                mês: doc.data().month,
                createdAt: doc.data().createdAt
            });
        });

        return transactions;
    }
     
    static async postTransactions(newTransaction){
        try{
          await db.collection("transactions").add(newTransaction);
        }catch(error){
            throw new Error(error);
        }
    }

    static async editAllTransaction(idTransaction,transaction) {
        try {
          const querySnapshot = await db
            .collection('transactions')
            .doc(idTransaction)
            .update(transaction);
          return querySnapshot;
        } catch (error) {
          console.error(error);
          throw new Error(error);
        }
      }
    

      static async deleteTransaction(idTransaction) {
        try {
          const document = db.collection("transactions").doc(idTransaction);
          const data = await document.get();
          if (!data.exists) {
            throw new Error("Transaction not found");
          }
          await document.delete();
          return { message: "Transaction deleted successfully" };
        } catch (error) {
          console.error(error);
          throw new Error("Error deleting transaction");
        }
      }
    
}


module.exports = transactionsModel ;
