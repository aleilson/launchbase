const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")


// Servindo os arquivos estaticos dentro da pasta public
server.use(express.static('public'))

server.set("view engine", "njk")


nunjucks.configure("views", {
    express: server,
    autoescape: false, //para imprimir o html que foi inserido na variavel about
    noCache: true //Sem cache
})

// Req = requisição,
// Res = resposta

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://avatars2.githubusercontent.com/u/37852847?s=460&v=4",
        name: "Aleilson Gomes",
        role: "Developer Front-end",
        description: "Programador Javascript.",
        links: [
            { name: "Github", url: "https://github.com/aleilson"},
            { name: "Instagram", url: "https://www.instagram.com/aleilsongomes/?hl=en"},
            { name: "Linkedin", url: "https://br.linkedin.com/in/aleilson-gomes-0b6a9a98"},
        ]
    }

    return res.render("about", { about })
})

server.get("/portfolio", function(req, res){
    return res.render("portfolio",  {items: videos })
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if(!video){
        return res.send("Video not found!")
    }

    
    return res.render("video", {item: video })
})

server.listen(5000, function(){
    console.log("Server is running")
})