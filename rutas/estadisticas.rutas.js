const express = require('express');
//const router = express.Router();
const app = express();

const Estadisticas = require('../controladores/estadisticas.controlador');

app.get('/:bd/statisticsofclusters',Estadisticas.mostrarEstadisticas);

module.exports = app;