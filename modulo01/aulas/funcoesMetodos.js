//Criar um programa que calcula a media
// das turmas de alunos e envia
//mensagem de calculo da média.

const alunosDaTurmaA = [
    {
        nome: "Ale",
        nota: 9.8
    },
    {
        nome: "Silva",
        nota: 10
    },
    {
        nome: "Fulano",
        nota: 2
    }
]

const alunosDaTurmaB = [
    {
        nome: "Mika",
        nota: 8.8
    },
    {
        nome: "Axe",
        nota: 2
    },
    {
        nome: "Vio",
        nota: 4
    }
]

function calculaMedia(alunos) {

    return (alunos[0].nota + alunos[1].nota + alunos[2].nota) / 3
}

const media1 = calculaMedia(alunosDaTurmaA)
const media2 = calculaMedia(alunosDaTurmaB)

function enviaMensagem(media, turma) {
    //Se a media for maior que 5, parabenizar a turma
    if(media > 5){
        console.log(`A media da turma ${turma} foi de ${media}. Parabéns`)
    } else {
        console.log(`A média da turma ${turma} é menor que 5`)
    }
}

enviaMensagem(media1, 'turmaA')
enviaMensagem(media2, 'turmaB')
