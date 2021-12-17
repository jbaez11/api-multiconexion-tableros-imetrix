/* PETICION GET PARA OBTENER TODAS LAS CATEGORIAS */
let getPruebas = async (req, res) =>{

    /* Requerimos el Modelo */
    const {pruebaModel} = require('../modelos/prueba.modelo')(req.conexion)

    /* Buscamos en la Coleccion de categorias */
    pruebaModel.find({}).exec((err, data) => {
        /* Si hay Error en la petición */
        if(err){
            return res.json({
                status : 500,
                mensaje: "Error en la petición",
                err
            })
        }
        /* Si no hay Error */
        res.json({
            status: 200,
            mensaje: "Categorias",
            data
        })
    })

    return pruebaModel
}/* getPruebas */

/* PETICION POST PARA CREAR UNA PRUEBA */
let addPrueba = (req, res) => {

    /* Requerimos el Modelo */
    const {pruebaModel} = require('../modelos/prueba.modelo')(req.conexion)

    /* Obtenemos el cuerpo del formulario */
    let body = req.body;
    let prueba;

    switch(req.params.bd){

        case 'igsSufiCO':
            /* Creamos un nuevo modelo del formulario */

            prueba = new pruebaModel({
                name: body.name.toLowerCase(),
                valor: body.valor
            })

            break;
    }

    /* Guardamos en Base de Datos */
    prueba.save((err, data) =>{
        /* Si hay error */
        if(err){
            return res.json({
                status:400,
                mensaje:"Error al crear la Prueba",
                err
            })
        }
        /* Si no hay Error */
        res.json({
            status:200,
            data,
            mensaje:"La Prueba ha sido creada con exito"
        })
    })
}/* addPrueba */

module.exports = {getPruebas, addPrueba}