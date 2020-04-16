const cards = document.querySelectorAll(".receitas__card");

for(let card of cards){
    card.addEventListener("click", function(){
        const linkId = card.getAttribute("id");
        window.location.href = `/recipes?id=${linkId}`
    });
}


const infoGeneral = document.querySelectorAll(".info-gerais")
const buttonInfos = document.querySelectorAll(".head_recipe button")

for(let i = 0; i < buttonInfos.length; i++){

    buttonInfos[i].addEventListener('click', function(){
        
        if(infoGeneral[i].classList.contains('remove_thumb')){

            infoGeneral[i].classList.remove('remove_thumb')
            buttonInfos[i].innerHTML = "Esconder"
        } else {

            infoGeneral[i].classList.add('remove_thumb')
            buttonInfos[i].innerHTML = "Mostrar"
        }
    });
}

