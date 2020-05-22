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

const createInputReceipt = document.querySelector(".card_create")
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


// Uploado de fotos
const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadoLimit: 5,
    files: [],
    handleFileInput(event){
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)
                PhotosUpload.preview.appendChild(div)

            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event){
        const { uploadoLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if( fileList.length > uploadoLimit){
            alert(`Envioe no máximo ${uploadoLimit}`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > uploadoLimit){
            alert("Você atingiu o limite o máximo de fotos!")
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image){
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event){
        const photoDiv = event.target.parentNode // <div class="photo">
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event){
        const photoDiv = event.target.parentNode

        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if (removedFiles) {
                removedFiles.value += `${photoDiv.id}`
            }
        }

        photoDiv.remove()
    }
}


const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(e){
        const { target } = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
        target.classList.add('active')

        ImageGallery.highlight.src = target.src
        Lightbox.image.src = target.src
    }
}

const Lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
    open() {
        Lightbox.target.style.opacity = 1
        Lightbox.target.style.top = 0
        Lightbox.target.style.bottom = 0
        Lightbox.closeButton.style.top = 0

    },
    close() {
        Lightbox.target.style.opacity = 0
        Lightbox.target.style.top = "-100%"
        Lightbox.target.style.bottom = "initial"
        Lightbox.closeButton.style.top = "-80px"
    }
}

const Validate = {
    apply(input, func){
        Validate.clearErrors(input)

        let results = Validate[func](input.value)
        input.value = results.value

        if(results.error)
            Validate.displayError(input, results.error)

    },
    displayError(input, error){
        input.classList.add('error')
        input.focus()
    },
    clearErrors(input){
        input.classList.remove('error')
    },
    isEmail(value) {
        let error = null
        
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!value.match(mailFormat))
            error = "Email inválido"

        return {
            error,
            value
        }
    }
}
