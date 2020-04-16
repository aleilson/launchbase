// Criar um programa que calcula a média
// das turmas de alunos e envia
// mensagem do cáculo da média.


const alunosDaTurmaA = [
    {
        nome: 'Aleilson',
        nota: 10 
    },
    {
        nome: 'Gomes',
        nota: 2
    },
    {
        nome: 'Cerqueira',
        nota: 8
    }
]

const alunosDaTurmaB = [
    {
        nome: 'Maxwell',
        nota: 5 
    },
    {
        nome: 'Silveira',
        nota: 3
    },
    {
        nome: 'Toztoz',
        nota: 10
    }
]

function calculaMedia(alunos){
    return (alunos[0].nota + alunos[1].nota + alunos[2].nota) / 3
}

const media1 = calculaMedia(alunosDaTurmaA)
const media2 = calculaMedia(alunosDaTurmaB)


function enviaMensagem(media, turma){
    if(media > 5){
        console.log(`A media da turma ${turma} foi de ${media}, Parabéns.`)
    } else {
        console.log(`Xii, deu ruim. Média da ${turma} muito baixa`)
    }
    
}

enviaMensagem(media1, 'turmaA')
enviaMensagem(media2, 'turmaB')




