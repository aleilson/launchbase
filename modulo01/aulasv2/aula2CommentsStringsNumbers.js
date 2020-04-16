// Criar um programa que calcula a média
// das notas entre os alunos e envia
// mensagem do cáculo da média.
// Se a media for maior que 5 parabenizar a turma

const aluno01 = 'Aleilson'
const notaAluno01 = 9.8

const aluno02 = "Gomes"
const notaAluno02 = 6

const aluno03 = `Cerqueira ${aluno01}`
const notaAluno03 = 9

const media = (notaAluno01 + notaAluno02 + notaAluno03) / 3

console.log(media)

if(media > 5){
    console.log(`Parabéns, média foi de ${media}`)
} else {
    console.log('Xii, deu ruim. Média muito baixa')
}
