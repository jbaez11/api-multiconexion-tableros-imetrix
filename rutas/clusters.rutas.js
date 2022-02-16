const express = require('express');
const app = express();

/* Requerimos el Modelo de categorias */
const Clusters = require('../controladores/cluster.controlador');

/* Creamos las rutas para realizar las peticiones */
app.post("/:bd/addCluster", Clusters.addCluster)
app.get("/:bd/getClusters", Clusters.getClusters)
app.put("/:bd/editCluster/:id", Clusters.editCluster)
app.delete("/:bd/deleteCluster/:id", Clusters.deleteCluster)
app.get("/:bd/getClustersNames", Clusters.getClusterNames)

/* Exportamos las rutas */
module.exports = app;