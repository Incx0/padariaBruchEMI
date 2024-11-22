const route = require('express').Router();

//importa o categoriaController
const categoriaController = require('../controllers/categoria.controller');

//rota de get de todos os categorias
route.get("/",categoriaController.get);
//rota de get de um categoria em específico
route.get("/:id", categoriaController.getById);
//rota de post de um categoria no banco
route.post("/addcategoria",categoriaController.add);


module.exports = route;