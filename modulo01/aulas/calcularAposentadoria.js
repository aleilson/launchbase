// Cálculo de aposentadoria
// Crie um programa para calcular a aposentadoria de uma pessoa.

// Obs.: Esse cálculo é fictício, dentro da aposentadoria existem muitos outros fatores para serem levados em conta :)

// Comece criando constantes para armazenar nome, sexo, idade e contribuicao(em anos), por exemplo:

// const nome = "Abdal";
// const sexo = "F";
// const idade = 70;
// const contribuicao = 60

const users = [
    {
        nome: "Abdal",
        sexo: "M",
        idade: 70,
        contribuicao: 60,
    },
    {
        nome: "Maria",
        sexo: "F",
        idade: 89,
        contribuicao: 45,
    }
]
// Baseado nos valores acima utilize as fórmulas a seguir para calcular se a pessoa está apta ou não para se aposentar e no fim imprima uma mensagem em tela.

function passaUsers(users){
    showName = ''
    for(let i = 0; i < users.length; i++){
        showName = users[i].nome
    }

    let sexoList = ''
    for(let i = 0; i < users.length; i++){
        sexoList = sexoList[i].sexo
    }
    return sexoList, showName
}
// O tempo de contribuição mínimo para homens é de 35 anos e, para mulheres, 30 anos;
// Utilizando a regra 85-95, a soma da idade com o tempo de contribuição do homem precisa ser de no mínimo 95 anos, enquanto a mulher precisa ter no mínimo 85 anos na soma;

// const returnName = passaUsers(users)
// const returnSexo = passaUsers(users)

const restAnos = 45 - users.contribuicao

const aposentadoria = users.idade + users.contribuicao;
function verificationApose(sexoList, showName){
    if((sexoList == 'M' && aposentadoria > 95) || (sexoList == 'F' && aposentadoria >=85)){

        console.log(`${showName}, você pode se aposentar, seu tempo de contribuição é ${restAnos}`)
    } else{
        console.log(`${showName}, você ainda não pode se aposentar, resta ${restAnos} anos. Trabalhe mais um pouco.`)    
    }
}

verificationApose(aposentadoria,restAnos )