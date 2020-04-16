const cards = document.querySelectorAll(".receitas__card");

for (let card of cards) {
    card.addEventListener("click", function () {
        const linkId = card.getAttribute("id");
        window.location.href = `/recipes/${linkId}`
    });
}


// Mostra e oculta detalhes da receita
function showDetails(){
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
}

const detailsRecipe = document.querySelector(".infos_recipe")
if(detailsRecipe){
    showDetails(detailsRecipe)
}

// Cria novos inputs para criação de receita
function createReceipt(){
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
}

const createInputReceipt = document.querySelector(".card_recipe")
if(createInputReceipt){
    createReceipt(createInputReceipt)
}

// MENU ACTIVE
const currentPage = location.pathname
const menuItems = document.querySelectorAll(".navbar__options li a")

for (item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}


// PAGINAÇÃO
function paginate(selectedPage, totalPages){
    
    let pages = [],
        oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++){
        
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            
            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if(oldPage && currentPage - oldPage == 2){
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages
}

function createPagination(pagination){
    
    const filter = +pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)
    
    let elements = ""
    
    for(let page of pages) {
        if(String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            if( filter ) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }
    
    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")
if(pagination){
    createPagination(pagination)
}
