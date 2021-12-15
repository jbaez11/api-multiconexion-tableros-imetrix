const express = require('express');
//const router = express.Router();
const app = express();

const Consumo = require('../controladores/consumo.controlador');

app.get('/:bd/consumo',Consumo.mostrarConsumo);

module.exports = app;