<<<<<<< HEAD
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
app.use('/', require('./rutas/keywords.ruta'));


app.listen(port,()=>{
    console.log("App listening on port" + " " + port)
})
=======
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
app.use('/',require('./rutas/consumo.rutas'));


app.listen(port,()=>{
    console.log("app is listening port"+port)
})
>>>>>>> 10a8a2fa0bdaf86fcf0cc7be264dff6409bf178d
