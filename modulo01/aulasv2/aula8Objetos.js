// Criar um programa que calcula a média
// das notas entre os alunos e envia
// mensagem do cáculo da média.
// Se a media for maior que 5 parabenizar a turma

const aluno01 = {
    nome: 'Aleilson',
    nota: 10
}

const aluno02 = {
    nome: 'Gomes',
    nota: 6
}

const aluno03 = {
    nome: 'Cerqueira',
    nota: 4
}

const media = (aluno01.nota + aluno02.nota + aluno03.nota) / 3

console.log(media)

if(media > 5){
    console.log(`Parabéns, média foi de ${media}`)
} else {
    console.log('Xii, deu ruim. Média muito baixa')
}


