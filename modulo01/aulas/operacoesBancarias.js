const user = {
    name: 'Mariana',
    transactions: [],
    balance:0
}

 function createTransaction(type, value){

    let transactions = {type:`${type}`,value:value}

    if(transactions.type == 'credit')
    {
        user.balance = value + user.balance
    }else{
        user.balance = user.balance - value
    }

    return user.transactions.push(transactions)
}

function showBalanceMessage()
{
    if(user.balance > 0)
    {
        console.log(`O saldo atual da sua conta é : ${user.balance} reais e você não está negativo`)
    }else{
        console.log(`O saldo atual da sua conta é : ${user.balance} reais e você está negativo`)
    }
}

createTransaction('credit', 1)
createTransaction('credit', 2)
createTransaction('debit', 5)
createTransaction('debit', 120)

showBalanceMessage();




function getHigherTransactionByType(type)
{  
    
    let higherTransactionValue = 0
    let higherTransaction

    for(let transaction of user.transactions)
    {
        if(transaction.type == type && transaction.value > higherTransactionValue)
        {
            higherTransactionValue = transaction.value
            higherTransaction = transaction
        }
    }
    console.log(higherTransaction)

}


getHigherTransactionByType('debit')