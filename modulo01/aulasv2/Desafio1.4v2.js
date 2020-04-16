// Desafio 01-4. Aplicação: Operações bancárias
// Crie um programa para realizar operações bancárias na conta de um usuário.
// Comece criando um objeto com o nome do usuário, suas transações e saldo.
// As transações (transactions) devem iniciar como um array vazio [] e o saldo (balance) em 0 (zero).
const user = {
    name: 'Mayk',
    transactions: [],
    balance: 0
}

// Adicionar transações
// Crie uma função createTransaction para adicionar uma nova transação no array de transações de um usuário, essa função deve receber como parâmetro um objeto de transação que tem o seguinte formato:
function createTransaction(type, value){
    let transactions = { type: `${type}`, value: value}
    if( transactions.type == 'credit'){

        user.balance = value + user.balance
    } else {
        user.balance = user.balance - value
    }

    return user.transactions.push(transactions)
}

function showBalanco (){
    if(user.balance > 0){
        console.log(`O saldo atual da sua conta é : ${user.balance} reais e você não está negativo`)
    } else {
        console.log(`O saldo atual da sua conta é : ${user.balance} reais e você está negativo`)
    }
}

createTransaction('credit', 48)
createTransaction('credit', 27)
createTransaction('debit', 38)
createTransaction('debit', 93)

showBalanco();

function getHigherTransactionByType(type){
    let higherTransactionValue = 0
    let higherTransaction = 0

    for(let transaction of user.transactions){
        if(transaction.type == type && transaction.value > higherTransactionValue){
            higherTransactionValue = transaction.value
            higherTransaction = transaction
        }
    }
    console.log(higherTransaction)
}


getHigherTransactionByType('debit')