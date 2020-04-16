// Desafio 01-3. Funções e estruturas de repetição
// Desafios para fortalecer os conhecimentos obtidos até aqui.

// Usuários e tecnologias
// Crie um programa que armazena um array de usuários (objetos), cada usuário tem um nome e suas tecnologias (novo array), por exemplo:

const usuarios = [
    { nome: 'Igor', tecnologias: ['HTML', 'CSS'] },
    { nome: 'Jasmine', tecnologias: ['JavaScript', 'CSS'] },
    { nome: 'Tuane', tecnologias: ['HTML', 'Node.js'] }
  ]

function mostraUsuarios (usuarios) {
    for (let i = 0; i < usuarios.length; i++ ){

        mostraNome = usuarios[i].nome;
        mostraTechs = usuarios[i].tecnologias;

        console.log(`${mostraNome} trabalha com ${mostraTechs}`);
        console.log("*************************************")
    }
}
mostraUsuarios(usuarios)

// Baseado no desafio anterior, utilize a mesma lista de usuários construída.

// Crie uma função que recebe os dados de um objeto de usuário e retorna SE o usuário trabalha com CSS ou não. Essa função deve retornar um boolean true/false.

function buscaPorCss(usuarios){

    for (let i = 0; i < usuarios.tecnologias.length; i++){
        if(usuarios.tecnologias[i] == 'CSS'){
            return true
        }
    }
}

// Percorra o array de usuários e, para cada um, verifique se o mesmo 
// trabalha com CSS utilizando a função construída acima, se SIM, imprima em tela as informações do usuário:

function mostraSeUsuarioTemCss() {

    for( let i = 0; i < usuarios.length; i++){
        const usuarioComCSS = buscaPorCss(usuarios[i])

        if(usuarioComCSS){
            console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`)
        }
    }
}

mostraSeUsuarioTemCss();