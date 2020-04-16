const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({ extended: true }))
// Servindo os arquivos estaticos dentro da pasta public
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false, //para imprimir o html que foi inserido na variavel about
    noCache: true //Sem cache
})

server.listen(5000, function(){
    console.log("Server is running")
})