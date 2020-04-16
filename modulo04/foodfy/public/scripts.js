const cards = document.querySelectorAll(".receitas__card");

for (let card of cards) {
    card.addEventListener("click", function () {
        const linkId = card.getAttribute("id");
        window.location.href = `/recipes?id=${linkId}`
    });
}


const infoGeneral = document.querySelectorAll(".info-gerais")
const buttonInfos = document.querySelectorAll(".head_recipe button")

for (let i = 0; i < buttonInfos.length; i++) {

    buttonInfos[i].addEventListener('click', function () {

        if (infoGeneral[i].classList.contains('remove_thumb')) {

            infoGeneral[i].classList.remove('remove_thumb')
            buttonInfos[i].innerHTML = "Esconder"
        } else {

            infoGeneral[i].classList.add('remove_thumb')
            buttonInfos[i].innerHTML = "Mostrar"
        }
    });
}

const ingField = document.querySelector(".add-ingredient")

function addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");

    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;

    // Deixa o valor do input vazio
    newField.children[0].value = "";
    ingredients.appendChild(newField);
}

ingField.addEventListener("click", addIngredient)


const prepField = document.querySelector(".add-preparation")

function addPreparation() {
    const preparations = document.querySelector("#preparations");
    const fieldContainer = document.querySelectorAll(".preparation");
    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(
        true
    );
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    preparations.appendChild(newField);
};

prepField.addEventListener("click", addPreparation);