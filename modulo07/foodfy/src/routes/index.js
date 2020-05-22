const express = require('express')
const routes = express.Router()
const FoodfyController = require('../app/controllers/FoodfyController')

const recipes = require('./recipes')
const chefs = require('./chefs')
const users = require('./users')

routes.get("/", FoodfyController.home) // Mostra pagina Home
routes.get("/sobre", FoodfyController.about) // Mostra pagina de sobre Foodfy
routes.get("/receitas", FoodfyController.receitas) // Mostra pagina de receitas
routes.get("/chefs", FoodfyController.chefs) // Mostra pagina de Chefs
routes.get("/recipes/:id", FoodfyController.recipes) // Mostra detalhe da receita

routes.use('/admin', recipes)
routes.use('/admin', chefs)
routes.use('/admin', users)


routes.use(function(req, res) {
    const erro = {
        title_notfound: "ERRO 404",
        desc_notfound: "PAGINA NÃO ENCONTRADA =("
    }

    res.status(404).render("foodfy/erro", {erro});
});

module.exports = routes