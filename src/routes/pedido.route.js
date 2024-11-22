const route = require('express').Router();

//importa o pedidoController
const pedidoController = require('../controllers/pedido.controller');

//rota de get de todos os pedidos
route.get("/",pedidoController.get);
//rota de get de um pedido em específico
route.get("/:id", pedidoController.getById);
//rota de post de um pedido no banco
route.post("/addpedido",pedidoController.add);


module.exports = route;