const express = require('express');
const app = express();

/* Requerimos el Modelo de categorias */
const Pruebas = require('../controladores/prueba.controlador');

/* Creamos las rutas para realizar las peticiones */
app.post("/:bd/addPrueba", Pruebas.addPrueba)
app.get("/:bd/getPruebas", Pruebas.getPruebas)

/* Exportamos las rutas */
module.exports = app;