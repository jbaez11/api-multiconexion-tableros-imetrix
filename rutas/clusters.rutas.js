const express = require('express');
const app = express();

/* Requerimos el Modelo de categorias */
const Clusters = require('../controladores/cluster.controlador');

/* Creamos las rutas para realizar las peticiones */
app.post("/:bd/addCluster", Clusters.addCluster)
app.get("/:bd/getClusters", Clusters.getClusters)

/* Exportamos las rutas */
module.exports = app;