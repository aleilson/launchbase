const express = require('express');
const nunjuncks = require('nunjucks');

const server = express();
const courses = require('./data');

// Servindo os arquivos estaticos dentro da pasta public (CSS, JS)
server.use(express.static('public'));


//Sera no modelo view engine e reconhecerá os arquivos .njk
server.set("view engine", "njk")

//Configuração dos nunjucks e aplicando para nos arquivos da pasta views. No modelo express com o server.
nunjuncks.configure("views", {
    express: server,
    autoescape: false, //para imprimir o html que foi inserido na variavel about
    noCache: true //Sem cache
})

server.get("/", function(req, res){
    const informacoes = {
            logo_url: "https://camo.githubusercontent.com/e3a00cb35e63ebc807f3d6c3178e1f17c24a70f3/68747470733a2f2f726f636b6574736561742e636f6d2e62722f7374617469632f6f672e706e67",
            name: "Rocketseat",
            description: "As melhores tecnologias em programação, direto ao ponto e do jeito certo."
        }

    return res.render('courses', {informacoes, courses})
});

server.get("/about", function(req, res){
    const about = {
        title_about: "Sobre a Rocketseat",
        desc_about: "Mais do que uma plataforma de educação em tecnologia, somos uma comunidade incrível de programadores em busca do próximo nível 🚀",
        desctwo_about: "O objetivo da comunidade é ajudar a elevar o nível de cada profissional, seja em aspectos técnicos ou não, partindo do princípio de que compartilhar as experiências é a melhor forma de acelerar sua evolução como programador."
    }

    return res.render('about', {about})
});

server.get("/description", function(req, res){
    const id = req.query.id

    const course = courses.find(function(course){
        return course.id == id
    })
    
    return res.render("description", {item: course })
})


server.use(function(req, res) {
    const erro = {
        title_notfound: "ERRO 404",
        desc_notfound: "PAGINA NÃO ENCONTRADA =("
    }

    res.status(404).render("not-found", {erro});
});




server.listen(5000, function(){
    console.log("Server is running")
});