/* PETICION GET PARA OBTENER TODOS LOS MODULOS */
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

/* PETICION POST PARA CREAR UN MODULO */
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
}/* addModulo */

/* PETICION PUT PARA EDITAR UN MODULO */
let editModulo = (req, res) =>{

    /* Requerimos el Modelo */
    const {moduloModel} = require('../modelos/modulos.modelo')(req.conexion)

    let id = req.params.id;
    let body = req.body;

    /* Buscamos el id que se pasa por parametro para poder editarlo */
    moduloModel.findById(id, (err, data) => {

        /* Validamos que no ocurra error en el proceso */
        if(err){
            return res.json({
                status: 500,
                mensaje: "Error en el servidor",
                err 
            }) 
        }
    
        /* Validamos que la categoria exista */
        if(!data){
            return res.json({
                status: 400,
                mensaje: "El Modulo no existe en la BD",
                err 
            }) 
        } 

        /* Obtenemos los datos del formulario */
        let datosModulo = {
            name: body.name,
            categoria: body.categoria
        }

        /* Buscamos y actualizamos por medio del ID */
        moduloModel.findByIdAndUpdate(id, datosModulo, {new: true, runValidators: true}, (err, data)=>{
            /* Si hay error */
            if(err){
                return res.json({
                    status: 400,
                    mensaje: "Error al editar el Modulo",
                    err 
                }) 
            }
            /* Si no hay error */
            res.json({
                status: 200,
                data,
                mensaje: "El modulo ha sido actualizado con exito."
            })
        })
    })
}/* editModulo */

let deleteModulo = (req, res) => {

    /* Requerimos el Modelo */
    const {moduloModel} = require('../modelos/modulos.modelo')(req.conexion)

    let id = req.params.id;

    /* Buscamos el id que se pasa por parametro del documento a eliminar */
    moduloModel.findById(id, (err, data) =>{

        /* Validamos que no ocurra error en el proceso */
        if(err){
            return res.json({
                status: 500,
                mensaje: "Error en el servidor",
                err 
            }) 
        }

        /* Validamos que el modulo exista */
        if(!data){
            return res.json({
                status: 400,
                mensaje: "El Modulo no existe en la BD",
                err 
            }) 
        }

        /* Borramos registro en BD */
        moduloModel.findByIdAndRemove(id, (err, data) =>{
            /* Validamos que no ocurra error en el proceso */
            if(err){
                return res.json({
                    status: 400,
                    mensaje: "Error al Borrar el Modulo de BD",
                    err 
                }) 
            }
            /* Si no hay error */
            res.json({
                status: 200,
                data,
                mensaje: "El Modulo ha sido eliminado correctamente de la BD"
            })
        })

    })
}

module.exports = {addModulo, getModulos, editModulo, deleteModulo}