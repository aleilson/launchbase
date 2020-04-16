/*=============================
    
    OPERADORES DE LÓGICOS

    && "E" As duas condições devem ser verdadeiras para que a condição final seja verdadeira.
    || "OU" Uma das condições deve ser verdadeira para que a condição final seja verdadeira.

    ! "NÃO" Nega uma condição.
    
===============================*/

// console.log(5 == 5 && 6 == 6) // true
// console.log(5 == 5 && 6 != 6) // false

// console.log(5 != 5 && 6 == 6) // true
// console.log(5 == 5 && 6 != 6) // true

// console.log(!(5 > 6)) // true
// console.log(!(5 < 6)) // false

idade = 18

if(!(idade >= 18 ) || idade === 17){
    console.log('Bloquear a entrada')
} else {
    console.log('Deixar entrar')
}