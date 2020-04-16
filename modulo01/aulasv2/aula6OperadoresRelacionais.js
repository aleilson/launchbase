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

// ===============================*/

idade = 18

if(!(idade >= 18) || idade === 17){
    console.log('Bloquear a entrada')
} else {
    console.log('Deixar entrar')
}
