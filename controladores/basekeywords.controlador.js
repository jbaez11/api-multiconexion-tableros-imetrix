/* PETICION GET PARA OBTENER TODAS LAS KEYWORDS */
let getKeyWords = async (req, res) =>{

    /* Requerimos el Modelo */
    const {keyWordsModel} = require('../modelos/basekeywords.modelo')(req.conexion)
    const {clusterModel} = require('../modelos/clusters.modelo')(req.conexion)

    /* Buscamos en la Coleccion de keywords */
    keyWordsModel.find({})
    .populate({path:"cluster", model:"clusters"})
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
    const {keyWordsModel} = require('../modelos/basekeywords.modelo')(req.conexion)

    /* Obtenemos el cuerpo del formulario */
    let body = req.body;
    let keyword;

            
            /* Creamos un nuevo modelo del formulario */
            keyword = new keyWordsModel({
                name: body.name.toLowerCase(),
                cluster: body.cluster
            })


    /* Guardamos en Base de Datos */
    keyword.save((err, data) =>{
        /* Si hay error */
        if(err){
            return res.json({
                status:400,
                mensaje:"Error al crear la KeyWord",
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

/* PETICION PUT PARA EDITAR UNA KEYWORD */
let editKeyWord = (req, res) => {

    /* Requerimos el Modelo */
    const {keyWordsModel} = require('../modelos/basekeywords.modelo')(req.conexion)

    let id = req.params.id;
    let body = req.body;

    /* Buscamos el id que se pasa por parametro del documento a editar */
    keyWordsModel.findById(id, (err, data) =>{

        /* Validamos que no ocurra error en el proceso */
        if(err){
            return res.json({
                status: 500,
                mensaje: "Error en el servidor",
                err 
            }) 
        }

        /* Validamos que la keyword exista */
        if(!data){
            return res.json({
                status: 400,
                mensaje: "La Keyword no existe en la BD",
                err 
            }) 
        }

        /* Obtenemos los datos del formulario */
        let datosKeyWords = {
            name: body.name,
            cluster: body.cluster
        }

        /* Buscamos por medio del ID y actualizamos */
        keyWordsModel.findByIdAndUpdate(id, datosKeyWords, {new: true, runValidators: true}, (err, data)=>{
            if(err){
                return res.json({
                    status: 400,
                    mensaje: "Error al editar la KeyWord.",
                    err 
                }) 
            }

            res.json({
                status: 200,
                data,
                mensaje: "La KeyWord ha sido actualizada con exito."
            })
        })

    })

}/* editKeyWord */

/* PETICION DELETE PARA ELIMINAR UNA KEYWORD */
let deleteKeyWord = (req, res) => {
    
    /* Requerimos el Modelo */
    const {keyWordsModel} = require('../modelos/basekeywords.modelo')(req.conexion)

    /* capturamos el ID de la keyword a borrar */
    let id = req.params.id;

    /* Buscamos el id que se pasa por parametro del documento a eliminar */
    keyWordsModel.findById(id, (err, data) =>{
 
        /* Validamos que no ocurra error en el proceso */
        if(err){
            return res.json({
                status: 500,
                mensaje: "Error en el servidor",
                err 
            }) 
        }
 
        /* Validamos que la keyword exista */
        if(!data){
            return res.json({
                status: 400,
                mensaje: "La KeyWord/Frase no existe en la Colección",
                err 
            }) 
        }
 
        /* Borramos registro en BD */
        keyWordsModel.findByIdAndRemove(id, (err, data) =>{
            /* Validamos que no ocurra error en el proceso */
            if(err){
                return res.json({
                    status: 400,
                    mensaje: "Error al Borrar la keyword de la Colección",
                    err 
                }) 
            }
 
            res.json({
                status: 200,
                data,
                mensaje: "La keyWord ha sido eliminada correctamente de la Colección"
            })
        })
    })
}/* deleteKeyWord */

/* Exportamos las funciones */
module.exports = {addKeyWord, getKeyWords, editKeyWord, deleteKeyWord}