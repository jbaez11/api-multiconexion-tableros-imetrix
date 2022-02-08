const express = require('express');
//const router = express.Router();
const app = express();

const Conversaciones = require('../controladores/conversaciones.controlador');

app.get('/:bd/conversations',Conversaciones.mostrarConversacion);

module.exports = app;