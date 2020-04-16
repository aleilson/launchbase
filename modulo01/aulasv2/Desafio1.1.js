// Cálculo de IMC


// Crie um programa para calcular o IMC e nível de obesidade de uma pessoa.
// Comece criando constantes para armazenar o nome, peso, altura e sexo de uma pessoa, por exemplo:

const nome = 'Aleilson'
const peso = 82
const altura = 1.75

// A partir desses dados armazene em uma constante chamada imc o cálculo do índice de massa corporal definido pela fórmula abaixo:
const imc = peso / (altura * altura)

// Baseado no valor obtido através desse cálculo exiba as seguintes mensagens:
// SE o IMC maior ou igual a 30: Carlos você está acima do peso;
// SE o IMC menor que 29.9: Carlos você não está acima do peso;

if( imc >= 30){
    console.log(`${nome} você está acima do peso, seu imc é de ${imc}`)
} else{
    console.log(`${nome} você não está acima do peso, seu imc é de ${imc}`)
}

// Cálculo de aposentadoria

// Crie um programa para calcular a aposentadoria de uma pessoa.
// Obs.: Esse cálculo é fictício, dentro da aposentadoria existem muitos outros fatores para serem levados em conta :)
// Comece criando constantes para armazenar nome, sexo, idade e contribuicao(em anos), por exemplo:
const name = 'Abdal'
const sexo = 'M'
const idade = 50
const contribuicao = 50

// Baseado nos valores acima utilize as fórmulas a seguir para calcular se a pessoa está apta ou não para se aposentar e no fim imprima uma mensagem em tela.
// O tempo de contribuição mínimo para homens é de 35 anos e, para mulheres, 30 anos;
// Utilizando a regra 85-95, a soma da idade com o tempo de contribuição do homem precisa ser de no mínimo 95 anos, enquanto a mulher precisa ter no mínimo 85 anos na soma;
aponsentadoria = idade + contribuicao

// Com base nas regras acima imprima na tela as mensagens:
// SE a pessoa estiver aposentada: Silvana, você pode se aposentar!;
if((aponsentadoria > 85) || (aponsentadoria > 95)){
    console.log(`${name}, você já pode se aposentar, aeew!`)
} else{
    // SE a pessoa NÃO estiver aposentada: Silvana, você ainda não pode se aposentar!;
    console.log(`${name}, ainda não pode se aposentar, trabalhe e pague impostos [=`)
}
