const express = require('express');
//const router = express.Router();
const app = express();

const Scoringkeywords = require('../controladores/scoringkeywords.controlador');

app.get('/:bd/scoringkeywords',Scoringkeywords.mostrarScoring);

module.exports = app;