// Usuários e tecnologias


// Crie um programa que armazena um array de usuários (objetos), cada usuário tem um nome e suas tecnologias (novo array), por exemplo:
const usuarios = [{
        nome: 'Aleilson',
        tecnologias: ['HTML', 'CSS', 'Javascript']
    },
    {
        nome: 'Gomes',
        tecnologias: ['NodeJs', 'CSS GRID', 'Javascript']
    },
    {
        nome: 'Cerqueira',
        tecnologias: ['JS', 'CSS', 'React']
    },
    {
        nome: 'Alisson',
        tecnologias: ['HTML5', 'CSS', 'jQuery']
    }
]

// Percorra a lista de usuários com uma estrutura de repetição imprimindo em tela as informações dos usuários:
function PercorreNoArray(usuarios) {
    for (let i = 0; i < usuarios.length; i++) {

        console.log(`${usuarios[i].nome} trabalha com ${usuarios[i].tecnologias}`)
        console.log('***************************************************')
    }
}
PercorreNoArray(usuarios)

// Busca por tecnologia
// Baseado no desafio anterior, utilize a mesma lista de usuários construída.
// Crie uma função que recebe os dados de um objeto de usuário e retorna SE o usuário trabalha com CSS ou não. Essa função deve retornar um boolean true/false.
function checagemDeCSS(usuarios) {
    for (let i = 0; i < usuarios.tecnologias.length; i++) {
        if (usuarios.tecnologias[i] == 'CSS') {
            return true
        }
    }
}

function mostraResultadoCSS() {
    for (let i = 0; i < usuarios.length; i++) {
        const cssOK = checagemDeCSS(usuarios[i])

        if (cssOK) {
            console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`)
            console.log('***************************************************')
        }
    }
}

mostraResultadoCSS()


// Soma de despesas e receitas
// Crie um programa que calcula a soma de receitas e despesas de usuários e no fim retorna o saldo (receitas - despesas).
// Utilize o array de usuários abaixo:
const usuariosReceita = [
    {
      nome: 'Salvio',
      receitas: [115.3, 48.7, 98.3, 14.5],
      despesas: [85.3, 13.5, 19.9]
    },
    {
      nome: 'Marcio',
      receitas: [24.6, 214.3, 45.3],
      despesas: [185.3, 12.1, 120.0]
    },
    {
      nome: 'Lucia',
      receitas: [9.8, 120.3, 340.2, 45.3],
      despesas: [450.2, 29.9]
    }
  ]

function calculaSaldo(receitas, despesas){
    let usersReceitas = somaNumeros(receitas)
    let usersDespesas = somaNumeros(despesas)

    return usersReceitas - usersDespesas
}

function somaNumeros(numeros){
    let resultado = 0
    for(let i = 0; i < numeros.length; i++){
        resultado = resultado + numeros[i]
    }
    return resultado
}

function mostraReceita(users){
    for(let i = 0; i < users.length; i++){
        let somaEnd = calculaSaldo(users[i].receitas, users[i].despesas)
        if(somaEnd > 0){
            console.log(`${users[i].nome} possui saldo POSITIVO de ${somaEnd.toFixed(2)}`)
        } else {
            console.log(`${users[i].nome} possui saldo NEGATIVO de ${somaEnd.toFixed(2)}`)
        }
    }
}

mostraReceita(usuariosReceita)
