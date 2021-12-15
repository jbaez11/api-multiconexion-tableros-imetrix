/* PETICION GET PARA OBTENER TODAS LAS KEYWORDS */
let getKeyWords = async (req, res) =>{

    /* Requerimos el Modelo */
    const {keyWordsModel} = require('../modelos/keywords.modelo')(req.conexion)

    /* Buscamos en la Coleccion de keywords */
    keyWordsModel.find({})
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
            mensaje: "KeyWords",
            data
        })
    })

    return keyWordsModel
}/* getKeyWords */

/* PETICION POST PARA CREAR UNA KEYWORD */
let addKeyWord = (req, res) => {

    /* Requerimos el Modelo */
    const {keyWordsModel} = require('../modelos/keywords.modelo')(req.conexion)

    /* Obtenemos el cuerpo del formulario */
    let body = req.body;
    let keyword;

    switch(req.params.bd){

        case 'igsSufiCO':
            
            /* Creamos un nuevo modelo del formulario */
            keyword = new keyWordsModel({
                name: body.name.toLowerCase(),
                cluster: body.cluster
            })

            break;
    }

    /* Guardamos en Base de Datos */
    keyword.save((err, data) =>{
        /* Si hay error */
        if(err){
            return res.json({
                status:400,
                mensaje:"Error al crear la Categoria",
                err
            })
        }
        /* Si no hay Error */
        res.json({
            status:200,
            data,
            mensaje:"La KeyWord ha sido creada con exito"
        })
    })
}/* addKeyWord */

module.exports = {addKeyWord, getKeyWords}