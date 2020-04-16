const express = require('express')
const routes = express.Router()
const recipes = require('./controllers/recipes')
const foodfy = require('./controllers/foodfy')

routes.get("/", foodfy.home) // Mostra pagina Home
routes.get("/sobre", foodfy.about) // Mostra pagina de sobre Foodfy
routes.get("/receitas", foodfy.receitas) // Mostra pagina de receitas
routes.get("/recipes", foodfy.recipes) // Mostra detalhe da receita



routes.get("/admin/recipes/", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita


routes.use(function(req, res) {
    const erro = {
        title_notfound: "ERRO 404",
        desc_notfound: "PAGINA NÃO ENCONTRADA =("
    }

    res.status(404).render("foodfy/erro", {erro});
});

module.exports = routes