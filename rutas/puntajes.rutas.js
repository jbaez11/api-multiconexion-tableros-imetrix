const express = require('express');
//const router = express.Router();
const app = express();

const Puntaje = require('../controladores/puntajes.controlador');

app.get('/:bd/auditscoringkeywords',Puntaje.mostrarPuntajes);

module.exports = app;