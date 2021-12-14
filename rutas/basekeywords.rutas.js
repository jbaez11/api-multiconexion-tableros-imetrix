const express = require('express');
//const router = express.Router();
const app = express();
const BaseKeywords = require('../controladores/basekeywords.controlador');




app.get('/:bd/basekeywords',BaseKeywords.mostrarBaseKeywords);
app.post('/:bd/crear-keywords',BaseKeywords.crearBaseKeywords);

module.exports = app;