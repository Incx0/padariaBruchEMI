//importa a função de router do express
const route = require('express').Router();

//importa o userController
const userController = require('../controllers/user.controller');

//rota de get de todos os users
route.get("/",userController.get);
//rota de get de um user em específico
route.get("/:id", userController.getById);
//rota de post de um user no banco
route.post("/add-user",userController.add);
//rota de login de um user
route.post("/login", userController.login)

module.exports = route;