const express = require('express');
const app = express();

/* Requerimos el Modelo de categorias */
const KeyWords = require('../controladores/keywords.controlador');

/* Creamos las rutas para realizar las peticiones */
app.post("/:bd/addKeyword", KeyWords.addKeyWord)
app.get("/:bd/getKeywords", KeyWords.getKeyWords)

/* Exportamos las rutas */
module.exports = app;