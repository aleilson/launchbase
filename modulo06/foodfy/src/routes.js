const express = require('express')
const routes = express.Router()
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')
const foodfy = require('./app/controllers/foodfy')

routes.get("/", foodfy.home) // Mostra pagina Home
routes.get("/sobre", foodfy.about) // Mostra pagina de sobre Foodfy
routes.get("/receitas", foodfy.receitas) // Mostra pagina de receitas
routes.get("/chefs", foodfy.chefs) // Mostra pagina de Chefs
routes.get("/recipes/:id", foodfy.recipes) // Mostra detalhe da receita

routes.get("/admin/recipes/", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

routes.get("/admin/chefs/", chefs.index); // Mostrar a lista de chefs
routes.get("/admin/chefs/create", chefs.create); // Mostrar formulário de novo chef
routes.get("/admin/chefs/:id", chefs.show); // Exibir detalhes do chef
routes.get("/admin/chefs/:id/edit", chefs.edit); // Mostrar formulário de edição do chef

routes.post("/admin/chefs", chefs.post); // Cadastrar novo chef
routes.put("/admin/chefs", chefs.put); // Editar um chef
routes.delete("/admin/chefs", chefs.delete); // Deletar um chef

routes.use(function(req, res) {
    const erro = {
        title_notfound: "ERRO 404",
        desc_notfound: "PAGINA NÃO ENCONTRADA =("
    }

    res.status(404).render("foodfy/erro", {erro});
});

module.exports = routes