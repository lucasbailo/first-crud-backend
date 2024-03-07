import express from 'express';
import admin from 'firebase-admin'


// REST API http://api.controle-de-gastos.com/transactions
const app = express();

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json"),
  databaseURL: "https://cost-control-63831-default-rtdb.firebaseio.com"
});


// GET      http://api.controle-de-gastos.com/transactions
app.get('/transactions', (request, response) => {
    console.log('GET transactions');
    admin.firestore()
        .collection('transactions')
        .get()
        .then(snapshot => {
            const transactions = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }))
            response.json(transactions);
        })
})

app.listen(3000, () => console.log('API rest iniciada em http://localhost:3000'))