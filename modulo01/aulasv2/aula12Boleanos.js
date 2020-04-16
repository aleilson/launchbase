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
    },
    {
        nome: 'NovoAluno',
        nota: 10
    }
]

const alunosDaTurmaB = [
    {
        nome: 'Maxwell',
        nota: 5 
    },
    {
        nome: 'Silveira',
        nota: 6
    },
    {
        nome: 'Toztoz',
        nota: 3
    }
]

function calculaMedia(alunos){
    let soma = 0
    for (let i = 0; i < alunos.length; i++){
        soma = soma + alunos[i].nota
    }
    
    const media = soma / alunos.length
    return media
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

function marcarComoReprovado(aluno){
    aluno.reprovado = false;
    if(aluno.nota < 5){
        aluno.reprovado = true
    }
}

function enviarMensagemReprovado(aluno){
    if(aluno.reprovado){
        console.log(`O aluno ${aluno.nome} está REPROVADO!`)
    }
}

function alunoReprovado(alunos){
    for(let aluno of alunos){
        marcarComoReprovado(aluno);
        enviarMensagemReprovado(aluno);
    }
}

alunoReprovado(alunosDaTurmaA)
alunoReprovado(alunosDaTurmaB)
