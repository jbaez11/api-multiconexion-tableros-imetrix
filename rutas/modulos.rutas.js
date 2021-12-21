const express = require('express');
const app = express();

/* Requerimos el Modelo de categorias */
const Modulos = require('../controladores/modulo.controlador');

/* Creamos las rutas para realizar las peticiones */
app.post("/:bd/addModulo", Modulos.addModulo)
app.get("/:bd/getModulos", Modulos.getModulos)
app.put("/:bd/editModulo/:id", Modulos.editModulo)
app.delete("/:db/deleteModulo/:id", Modulos.deleteModulo)



/* Exportamos las rutas */
module.exports = app;