const route = require('express').Router();

const notaFiscalController = require('../controllers/notaFiscal.controller');

route.post("/", notaFiscalController.save);
route.get("/", notaFiscalController.findAll);
route.get("/:id", notaFiscalController.findById);

module.exports = route;