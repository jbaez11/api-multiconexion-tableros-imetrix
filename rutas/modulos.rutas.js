const express = require('express');
const app = express();

/* Requerimos el Modelo de categorias */
const Modulos = require('../controladores/modulo.controlador');

/* Creamos las rutas para realizar las peticiones */
app.post("/:bd/addModulo", Modulos.addModulo)
app.get("/:bd/getModulos", Modulos.getModulos)

/* Exportamos las rutas */
module.exports = app;