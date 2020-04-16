const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const home = require("./home")
const receitas = require("./data")
const sobre = require("./sobre")

//Informando local de arquivos estaticos
server.use(express.static("public"))

//Informando o view engine que é o Nunjucks
server.set("view engine", "njk")

//Configurando o ambiente nunjucks e onde está os arquivos que seria os html que agora é .njk
nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true //Sem cache
})

server.get("/", function(req, res){

    return res.render("home",  {infoHome: home, receitas})
})

server.get("/sobre", function(req, res){

    return res.render("sobre", {sobreInfo: sobre})
})

server.get("/receitas", function(req, res){

    return res.render("receitas", { receitas })
})

server.get("/recipes", function(req, res){
    const id = req.query.id

    const receita = receitas.find(function(receita){
        return receita.id == id
    })
    

    if(!receita){
        const erro = {
            title_notfound: "ERRO 404",
            desc_notfound: "PAGINA NÃO ENCONTRADA =("
        }
        return res.status(404).render("erro", {erro})
    }
    
    return res.render("recipes", { receita })
})

server.use(function(req, res) {
    const erro = {
        title_notfound: "ERRO 404",
        desc_notfound: "PAGINA NÃO ENCONTRADA =("
    }

    res.status(404).render("erro", {erro});
});

server.listen(4000, function(){
    console.log("Server is running")
})

