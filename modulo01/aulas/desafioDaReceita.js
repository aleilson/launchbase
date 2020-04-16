const usuarios = [
    {
        nome: 'Pereira',
        receitas: [109.4, 98.2, 43.7, 12.1],
        despesas: [ 89.3, 22.4, 17.2, 45.1]
    },
    {
        nome: 'Green',
        receitas: [155.8, 23.2, 54.2, 133.7],
        despesas: [ 21.2, 89.8, 56.3, 78.3]
    },
    {
        nome: 'Max',
        receitas: [142.3, 102.3, 44.6, 18.3],
        despesas: [ 98.8, 28.8, 71.3, 56.8]
    }
]

function calculaSaldo(usuarios) {
    let somaReceita = 0
    for (let i = 0; i < usuarios.receitas.length; i++) {
        somaReceita = somaReceita + usuarios.receitas[i]
    }

    let somaDespesa = 0
    for (let i = 0; i < usuarios.despesas.length; i++) {
        somaDespesa = somaDespesa + usuarios.despesas[i]
    }
    return somaReceita - somaDespesa
}


function imprimeSaldo() {
    for (let i = 0; i < usuarios.length; i++) {
        let saldo = calculaSaldo(usuarios[i])
        if (saldo < 0) {
            console.log(`${usuarios[i].nome} possui saldo NEGATIVO de: ${saldo}`)
        }else{
            console.log(`${usuarios[i].nome} possui saldo POSITIVO de: ${saldo}`)
        }
    }
}

imprimeSaldo();