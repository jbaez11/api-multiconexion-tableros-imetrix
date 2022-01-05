/* PETICION GET PARA OBTENER TODAS LAS CATEGORIAS */
let getCategorias = async (req, res) =>{

    /* Requerimos el Modelo */
    const {categoriaModel} = require('../modelos/categorias.modelo')(req.conexion)


    /* Buscamos en la Coleccion de categorias */
    categoriaModel.find({}).exec((err, data) => {
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

    return categoriaModel
}/* getCategorias */

/* PETICION POST PARA CREAR UNA CATEGORIA */
let addCategoria = (req, res) => {

    /* Requerimos el Modelo */
    const {categoriaModel} = require('../modelos/categorias.modelo')(req.conexion)

    /* Obtenemos el cuerpo del formulario */
    let body = req.body;
    let categoria;

        /* Creamos un nuevo modelo del formulario */

        categoria = new categoriaModel({
            name: body.name.toLowerCase()
        })

         


    /* Guardamos en Base de Datos */
    categoria.save((err, data) =>{
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
            mensaje:"La Categoria ha sido creada con exito"
        })
    })
}/* addCategoria */

module.exports = {addCategoria, getCategorias}