const express = require('express');
//const router = express.Router();
const app = express();
const BaseAgents = require('../controladores/agentes.controlador');




app.get('/:bd/baseagents',BaseAgents.mostrarAgents);
app.post('/:bd/crear-agents',BaseAgents.crearAgents);

module.exports = app;