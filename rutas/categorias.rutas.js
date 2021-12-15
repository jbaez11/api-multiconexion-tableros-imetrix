const express = require('express');
const app = express();

/* Requerimos el Modelo de categorias */
const Categorias = require('../controladores/categoria.controlador');

/* Creamos las rutas para realizar las peticiones */
app.post("/:bd/addCategoria", Categorias.addCategoria)
app.get("/:bd/getCategorias", Categorias.getCategorias)

/* Exportamos las rutas */
module.exports = app;