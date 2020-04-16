// Criar um programa que calcula a média
// das notas entre os alunos e envia
// mensagem do cáculo da média.
// Se a media for maior que 5 parabenizar a turma

const alunos = [
    {
        nome: 'Aleilson',
        nota: 10 
    },
    {
        nome: 'Gomes',
        nota: 6
    },
    {
        nome: 'Cerqueira',
        nota: 4
    }
]

const nomesDeAlunos = ['Alezinho', 'Gominho', 'Mayk']

const media = (alunos[0].nota + alunos[1].nota + alunos[2].nota) / 3

console.log(alunos)

if(media > 5){
    console.log(`Parabéns, média foi de ${media}`)
} else {
    console.log('Xii, deu ruim. Média muito baixa')
}




