const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.techs__box');

for(let card of cards){
    card.addEventListener("click", function(){
        const linkId = card.getAttribute("id");
        modalOverlay.classList.add("active")
        modalOverlay.querySelector("iframe").src = `https://rocketseat.com.br/${linkId}`

    });
}

const closeModal = document.querySelector(".close-modal").addEventListener("click", function(){
    modalOverlay.classList.remove("active")
    modalOverlay.querySelector("iframe").src = ""
});

const maxmizeModal = document.querySelector(".maximize-modal").addEventListener("click", function(){
    modalOverlay.classList.contains("maximize");
});
