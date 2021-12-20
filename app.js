require('./config/config')
const db = require('./config/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const morgan = require('morgan');

const app = express();
const port = 8080;
//global.conexion = null ;

//middleware body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit:'10mb', extended: true }))
 
// parse application/json
app.use(bodyParser.json({limit:'10mb', extended: true }))

app.use(morgan('dev'));

app.use(cors());

app.use('/:bd/:accion',(req, res, next) => {
   
    nameDB = req.params.bd;
    req.conexion = db.makeNewConnection(nameDB);
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
      
    next();   
      
  });


app.use('/',require('./rutas/agentes.rutas'));
app.use('/',require('./rutas/basekeywords.rutas'));
app.use('/', require('./rutas/categorias.rutas'));
app.use('/', require('./rutas/modulos.rutas'));
app.use('/', require('./rutas/clusters.rutas'));
app.use('/', require('./rutas/basekeywords.rutas'));
app.use('/', require('./rutas/keywords.rutas'));
app.use('/',require('./rutas/consumo.rutas'));
app.use('/',require('./rutas/auditoria.rutas'));
app.use('/', require('./rutas/pruebas.rutas'));



app.listen(port,()=>{
    console.log("App listening on port" + " " + port)
})
