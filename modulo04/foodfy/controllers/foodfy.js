const sobre = require("../home/sobre")
const home = require("../home/home")
const data = require("../data.json")

exports.about = function(req, res){

    return res.render("foodfy/sobre", {sobreInfo: sobre})
}

exports.receitas = function(req, res){

    return res.render("foodfy/receitas", { receitas: data.recipes })
}

exports.home = function(req, res){

    return res.render("foodfy/home",  {infoHome: home, receitas: data.recipes})
}

exports.recipes = function(req, res){
    const id = req.query.id
    const receitas = data.recipes

    const receita = receitas.find(function(receita){
        return receita.id == id
    })
    

    if(!receita){
        const erro = {
            title_notfound: "ERRO 404",
            desc_notfound: "PAGINA NÃO ENCONTRADA =("
        }
        return res.status(404).render("foodfy/erro", {erro})
    }
    
    return res.render("recipes", { receita })
}