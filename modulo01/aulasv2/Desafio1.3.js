// Usuários e tecnologias


// Crie um programa que armazena um array de usuários (objetos), cada usuário tem um nome e suas tecnologias (novo array), por exemplo:
const usuarios = [
    { nome: 'Aleilson', tecnologias: ['HTML', 'CSS', 'Javascript'] },
    { nome: 'Gomes', tecnologias: ['NodeJs', 'CSS GRID', 'Javascript'] },
    { nome: 'Cerqueira', tecnologias: ['JS', 'CSS3', 'React'] },
    { nome: 'Alisson', tecnologias: ['HTML5', 'CSS', 'jQuery'] }
]

// Percorra a lista de usuários com uma estrutura de repetição imprimindo em tela as informações dos usuários:
function percorreArray(usuarios){

    for (let i = 0; i < usuarios.length; i++ ){

        userName = usuarios[i].nome;
        userTechs = usuarios[i].tecnologias;

        console.log(`${userName} trabalha com ${userTechs}`);
        console.log('*****************************')
    }
}

percorreArray(usuarios)




// Busca por tecnologia
// Baseado no desafio anterior, utilize a mesma lista de usuários construída.
// Crie uma função que recebe os dados de um objeto de usuário e retorna SE o usuário trabalha com CSS ou não. Essa função deve retornar um boolean true/false.
function checageDeCSS(usuarios){
    for( let i = 0; i < usuarios.tecnologias.length; i++){
        if(usuarios.tecnologias[i] == 'CSS'){
            return true
        }
    }
}

// Percorra o array de usuários e, para cada um, verifique se o mesmo trabalha com CSS utilizando a função construída acima, se SIM, imprima em tela as informações do usuário:
function mostraSeTemCSS(){
    for (let i = 0; i < usuarios.length; i++){
        const userWorkWithCSS = checageDeCSS(usuarios[i])

        if(userWorkWithCSS){
            console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`)
        }
    }
}

mostraSeTemCSS()



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

  function calculaSaldo(usuariosReceita){
     let mostraReceita = 0
     for(let i = 0; i < usuariosReceita.receitas.length; i++){
        mostraReceita = mostraReceita + usuariosReceita.receitas[i]
     }

     let mostraDespesas = 0
     for(let i = 0; i < usuariosReceita.despesas.length; i++){
        mostraDespesas = mostraDespesas + usuariosReceita.despesas[i]
     }

     return mostraReceita - mostraDespesas
  }

  function mostraSaldo(){
      for(let i = 0; i < usuariosReceita.length; i++){
          let saldo = calculaSaldo(usuariosReceita[i])
          if(saldo < 0){
              console.log(`${usuariosReceita[i].nome} possui saldo NEGATIVO de: ${saldo}`)
          } else {
              console.log(`${usuariosReceita[i].nome} possui saldo POSITIVO de: ${saldo}`)
          }
      }
  }

  mostraSaldo()