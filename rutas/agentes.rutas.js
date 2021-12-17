const express = require('express');
//const router = express.Router();
const app = express();
const BaseAgents = require('../controladores/agentes.controlador');

app.get('/:bd/baseagents',   BaseAgents.mostrarAgents);
app.post('/:bd/crear-agents',BaseAgents.crearAgents);
app.put('/:bd/editar-agents/:id', BaseAgents.editarAgent);

module.exports = app;