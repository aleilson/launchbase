const express = require('express')
const routes = express.Router()

const multer = require('../app/middlewares/multer')
const RecipesController = require('../app/controllers/RecipesController')

const { onlyUsers } = require('../app/middlewares/session')


routes.get("/recipes/", onlyUsers, RecipesController.index); // Mostrar a lista de receitas
routes.get("/recipes/create", onlyUsers, RecipesController.create); // Mostrar formulário de nova receita
routes.get("/recipes/:id", onlyUsers, RecipesController.show); // Exibir detalhes de uma receita
routes.get("/recipes/:id/edit", onlyUsers, RecipesController.edit); // Mostrar formulário de edição de receita

routes.post("/recipes", onlyUsers, multer.array("photos", 6), RecipesController.post); // Cadastrar nova receita
routes.put("/recipes", onlyUsers, multer.array("photos", 6), RecipesController.put); // Editar uma receita
routes.delete("/recipes", onlyUsers, RecipesController.delete); // Deletar uma receita

module.exports = routes