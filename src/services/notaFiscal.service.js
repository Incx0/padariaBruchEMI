const Notas_Fiscais = require('../models/Notas_Fiscais');
const dbMysql = require('../database/dbMysql');

const saveService = (body) =>Notas_Fiscais.create(body);

const findAllService = ()=> Notas_Fiscais.find();

const findByIdService = (id)=> Notas_Fiscais.findById(id);

module.exports = {saveService, findAllService, findByIdService};