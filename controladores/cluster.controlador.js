/* PETICION GET PARA OBTENER TODAS LAS CATEGORIAS */
let getClusters = async (req, res) =>{

    /* Requerimos el Modelo */
    const {clusterModel} = require('../modelos/clusters.modelo')(req.conexion)

    /* Buscamos en la Coleccion de categorias */
    clusterModel.find({})
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
            mensaje: "Clusters",
            data
        })
    })

    return clusterModel
}/* getCategorias */

/* PETICION POST PARA CREAR UNA CATEGORIA */
let addCluster = (req, res) => {

    /* Requerimos el Modelo */
    const {clusterModel} = require('../modelos/clusters.modelo')(req.conexion)

    /* Obtenemos el cuerpo del formulario */
    let body = req.body;
    let suma = 0 //Variable que se encarga de guardar la suma total de los porcentajes que esten actualmente en los documentos de la BD
    let porcentajeInsert = 0;//variable que guarda le valor del porcentaje que se esta recibiendo en el body
    let sumaTotal = 0;//variable que guarda la suma total de los porcentajes que hay en BD y del porcentaje que esta llegando en el body
    let validacion = false;//variable que valida si se puede insertar o no un nuevo cluster dependiendo del resultado de sumaTotal
    let cluster;

    switch(req.params.bd){

        case 'igsSufiCO':

            /* Creamos un nuevo modelo del formulario */
            cluster = new clusterModel({
                name: body.name.toLowerCase(),
                modulo: body.modulo,
                porcentaje: body.porcentaje
            })

            porcentajeInsert = cluster.porcentaje
            console.log("Porcentaje a Insertar", porcentajeInsert);
            break;
    }

     /* Recorremos la cantidad de documentos que hay en la colección de Cluster para obtener los porcentajes */
     clusterModel.find({}, {_id:false, porcentaje:true}).exec((err, data) => {
        /* Validamos si hay algun error en la petición */
        if(err){
                
            return res.json({
            Status: 500,
            Mensaje: "No se pudieron obtener los porcentajes de la colección Clusters"
            })
        }
            
        /* Recorremos la variable data para sumar los porcentajes */
        for(let i=0;i < data.length; i++){
                suma += data[i].porcentaje;
            }
            console.log("Suma de los porcentajes que estan en BD", suma);
            /* sumo los porcentajes que hay actualmente con el porcentaje que se quiere insertar */
            sumaTotal = suma + porcentajeInsert;

            console.log("Suma total antes de Insertar a BD", sumaTotal);

            /* si la sumaTotal es mayor a 1 la variable validacion queda en false y no se podria insertar el nuevo cluster */
            if(sumaTotal > 1) validacion = false;
            /* si la sumaTotal es menor o igual a uno la variable valiacion queda en true habilitando el poder insertar el nuevo cluster */
            else if(sumaTotal <= 1) validacion = true;

            console.log(validacion);
            /* si validacion es false no permite ingresar el nuevo cluster y devuelve una respuesta en json */
            if(validacion == false){
                return res.json({
                    Status: 400,
                    Mensaje: "Error al guardar el Cluster porque el porcentaje general es mayor a 1."
                })
            }else if(validacion == true){ /* si la variable validacion es true inserta el nuevo cluster a la colección */
                /* Guardamos en BD */
                cluster.save((err, data) => {
        
                    if(err){
                        return res.json({
                            Status: 400,
                            Mensaje: "Error al guardar el Cluster.",
                            err
                        })
                    }
                        
                    res.json({
                        status: 200,
                        data,
                        Mensaje: "El Cluster ha sido creado con exito."
                        })
                })
            }
    })

}/* addCategoria */

module.exports = {addCluster, getClusters}