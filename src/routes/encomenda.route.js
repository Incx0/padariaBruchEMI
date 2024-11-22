const route = require('express').Router();

//importa o encomendaController
const encomendaController = require('../controllers/encomenda.controller');

//rota de get de todos os encomendas
route.get("/",encomendaController.get);
//rota de get de um encomenda em específico
route.get("/:id", encomendaController.getById);
//rota de post de um encomenda no banco
route.post("/addencomenda",encomendaController.add);


module.exports = route;