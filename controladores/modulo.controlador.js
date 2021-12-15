/* PETICION GET PARA OBTENER TODAS LAS CATEGORIAS */
let getModulos = async (req, res) =>{

    /* Requerimos el Modelo */
    const {moduloModel} = require('../modelos/modulos.modelo')(req.conexion)

    /* Buscamos en la Coleccion de categorias */
    moduloModel.find({})
    .exec((err, data) => {
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
            mensaje: "Modulos",
            data
        })
    })

    return moduloModel
}/* getCategorias */

/* PETICION POST PARA CREAR UNA CATEGORIA */
let addModulo = (req, res) => {

    /* Requerimos el Modelo */
    const {moduloModel} = require('../modelos/modulos.modelo')(req.conexion)

    /* Obtenemos el cuerpo del formulario */
    let body = req.body;
    let modulo;

    switch(req.params.bd){

        case 'igsSufiCO':
            /* Creamos un nuevo modelo del formulario */

            modulo = new moduloModel({
                name: body.name.toLowerCase(),
                categoria: body.categoria
            })

            break;
    }

    /* Guardamos en Base de Datos */
    modulo.save((err, data) =>{
        /* Si hay error */
        if(err){
            return res.json({
                status:400,
                mensaje:"Error al crear el Modulo",
                err
            })
        }
        /* Si no hay Error */
        res.json({
            status:200,
            data,
            mensaje:"El modulo ha sido creado con exito"
        })
    })
}/* addCategoria */

module.exports = {addModulo, getModulos}