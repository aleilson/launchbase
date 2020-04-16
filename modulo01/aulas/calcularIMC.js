// Desafio 01-1. Primeiros passos com JS

// Desafios para fortalecer os conhecimentos obtidos até aqui.

// Cálculo de IMC
// Crie um programa para calcular o IMC e nível de obesidade de uma pessoa.

// Comece criando constantes para armazenar o nome, peso, altura e sexo de uma pessoa, por exemplo:

const nome = "Aleilson";
const peso = 84;
const altura = 1.75;
const sexo = "M"

// Baseado no valor obtido através desse cálculo exiba as seguintes mensagens:
// SE o IMC maior ou igual a 30: Carlos você está acima do peso;
// SE o IMC menor que 29.9: Carlos você não está acima do peso;
const imc = peso / (altura * altura);

if(imc >= 30){
    console.log(`${nome} você está acima do peso`)
} else {
    console.log(`${nome} você não está acima do peso`)
}