const express = require('express');
//const router = express.Router();
const app = express();

const Keywords = require('../controladores/keywords.controlador');

app.get('/:bd/keywords',Keywords.mostrarKeywords);

module.exports = app;