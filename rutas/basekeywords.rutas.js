const express = require('express');
const app = express();

/* Requerimos el Modelo de categorias */
const KeyWords = require('../controladores/basekeywords.controlador');

/* Creamos las rutas para realizar las peticiones */
app.post("/:bd/addKeyword", KeyWords.addKeyWord)
app.get("/:bd/getKeywords", KeyWords.getKeyWords)
app.put("/:bd/editKeyWord/:id", KeyWords.editKeyWord)
app.delete("/:bd/deleteKeyWord/:id", KeyWords.deleteKeyWord)

/* Exportamos las rutas */
module.exports = app;