// Desafios para fortalecer os conhecimentos obtidos até aqui.

// Construção e impressão de objetos
// Crie um programa que armazena dados da empresa Rocketseat dentro de um objeto chamado empresa. Os dados a serem armazenados são:

// Nome: Rocketseat
// Cor: Roxo
// Foco: Programação
// Endereço:
// Rua: Rua Guilherme Gembala
// Número: 260

const empresa = {
    nome: 'Rocketseat',
    cor: 'Roxo',
    foco: 'Programação',
    endereco: {
        rua: 'Rua Guilherme Gembala',
        numero: 260
    }
}

// Imprima em tela utilizando console.log o nome da empresa e seu endereço no seguinte formato:
console.log(`A empresa ${empresa.nome} está localizada em ${empresa.endereco.rua}, ${empresa.endereco.numero}`)

// Vetores e objetos
// Crie um programa com um objeto para armazenar dados de um programador como nome, idade e tecnologias que trabalha.
// Um programador pode trabalhar com várias tecnologias, por isso armazene essas tecnologias em um array.
// As tecnologias também devem ser objetos contendo nome e especialidade, use as tecnologias abaixo:

const informacoes = {
    name: 'Aleilson',
    years: 23,
    tecnologias: [
        { linguagem: 'Javascript', especialidade: 'Desktop, Mobile e App'}
    ]
}
console.log(`O usuário ${informacoes.name} tem ${informacoes.years} anos e usa a tecnologia ${informacoes.tecnologias[0].linguagem} com especialidade em ${informacoes.tecnologias[0].especialidade}`)