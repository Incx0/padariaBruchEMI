const route = require('express').Router();

//importa o produtoController
const produtoController = require('../controllers/produto.controller');

//rota de get de todos os produtos
route.get("/",produtoController.get);
//rota de get de um produto em específico
route.get("/:id", produtoController.getById);

route.get("/byCat/:catId", produtoController.getByCatId);
//rota de post de um produto no banco
route.post("/add-produto",produtoController.add);


module.exports = route;