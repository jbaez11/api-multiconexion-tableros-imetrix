const express = require('express');
//const router = express.Router();
const app = express();

const Conversaciones = require('../controladores/auditconversaciones.controlador');

app.get('/:bd/auditconversations',Conversaciones.mostrarConversacion);

module.exports = app;