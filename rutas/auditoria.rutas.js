const express = require('express');
//const router = express.Router();
const app = express();

const Auditoria = require('../controladores/auditoria.controlador');

app.get('/:bd/auditkeywords',Auditoria.mostrarAuditoria);

module.exports = app;