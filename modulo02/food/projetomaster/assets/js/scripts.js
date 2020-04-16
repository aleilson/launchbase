const modalOverlay = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".receitas__card");

for( let card of cards){
    card.addEventListener("click", function(){
        const cardImage = card.querySelector(".receitas__img img").src;
        const cardTitle = card.querySelector(".receitas__subtitle").innerHTML;
        const cardAuthor = card.querySelector(".receitas__author").innerHTML;

        modalOverlay.classList.add("active");
        modalOverlay.querySelector("img").src = `${cardImage}`;
        modalOverlay.querySelector("strong").innerHTML = `${cardTitle}`;
        modalOverlay.querySelector("p").innerHTML = `${cardAuthor}`
    });
}

document.querySelector(".close-modal").addEventListener("click", function(){
    modalOverlay.classList.remove("active");
});

