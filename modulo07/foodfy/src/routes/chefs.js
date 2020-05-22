const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const ChefsController = require('../app/controllers/ChefsController')

const { onlyUsers } = require('../app/middlewares/session')


routes.get("/chefs/", onlyUsers, ChefsController.index); // Mostrar a lista de chefs
routes.get("/chefs/create", onlyUsers, ChefsController.create); // Mostrar formulário de novo chef
routes.get("/chefs/:id", onlyUsers, ChefsController.show); // Exibir detalhes do chef
routes.get("/chefs/:id/edit", onlyUsers, ChefsController.edit); // Mostrar formulário de edição do chef

routes.post("/chefs", onlyUsers, multer.single("chefImage"), ChefsController.post); // Cadastrar novo chef
routes.put("/chefs", onlyUsers, multer.single("chefImage"), ChefsController.put); // Editar um chef
routes.delete("/chefs", onlyUsers, ChefsController.delete); // Deletar um chef

module.exports = routes
