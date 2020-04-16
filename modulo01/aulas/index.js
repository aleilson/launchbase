/*=============================
    
    OPERADORES DE COMPARAÇÕES

    > Maior
    < Menor
    >= Maior e igual
    <= Menor e igual a
    == Igual a
    === Igual e do mesmo tipo
    != Diferente de
    !== Diferente, inclusive do tipo

===============================*/

const aluno01 = "Ale"
const notaAluno01 = 9.8

const aluno02 = "Gomes"
const notaAluno02 = 10

const aluno03 = "Silva"
const notaAluno03 = 2

const media = (notaAluno01 + notaAluno02 + notaAluno03) / 3;

if (media > 5) {
    console.log(`A nota foi de ${media}. Parabéns`)
} else {
    console.log('A média foi menor que 5')
}

console.log(media)