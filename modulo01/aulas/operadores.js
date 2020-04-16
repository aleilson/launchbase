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

// console.log( 5 > 4 ) // true
// console.log( 5 < 4 ) // false
// console.log( 5 >= 4) // true
// console.log( 4 <= 4) // true

// MAIS
// console.log( 4 == "4") //true
// console.log(4 === "4") //false
// console.log( 4 != "5") //true
// console.log( 4 !== "5") //true


// DESAFIO 1
const idade = 19

// Verificar se a pessoa é maior de 18 anos
// Se sim, deixar entrar, se não, bloquear a entrada
console.log(idade >= 18)

if(idade >= 18){
    console.log('Deixar entrar')
} else {
    console.log('Bloquear a entrada')
}

//Se a pessoa tiver 17 anos
// avisar para voltar com 18 anos
if(idade === 17){
    console.log('Volte quando tiver 18 anos')
}