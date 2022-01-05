/* PETICION GET PARA OBTENER TODOS LOS CLUSTERS */
let getClusters = async (req, res) =>{

    /* Requerimos el Modelo */
    const {clusterModel} = require('../modelos/clusters.modelo')(req.conexion)
    const {moduloModel} = require('../modelos/modulos.modelo')(req.conexion)

    /* Buscamos en la Coleccion de categorias */
    clusterModel.find({})
    .populate({path:"modulo", model:"modulos"})
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
}/* getClusters */

/* PETICION POST PARA CREAR UN CLUSTER */
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


    /* Creamos un nuevo modelo del formulario */
    cluster = new clusterModel({

        name: body.name.toLowerCase(),
        modulo: body.modulo,
        porcentaje: body.porcentaje

    })

    porcentajeInsert = cluster.porcentaje
    console.log("Porcentaje a Insertar", porcentajeInsert);



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
            if(sumaTotal > 100) validacion = false;
            /* si la sumaTotal es menor o igual a uno la variable valiacion queda en true habilitando el poder insertar el nuevo cluster */
            else if(sumaTotal <= 100) validacion = true;

            console.log(validacion);

            /* si validacion es false no permite ingresar el nuevo cluster y devuelve una respuesta en json */
            if(!validacion){
                return res.json({
                    status: 401,
                    mensaje: "Error al guardar el Cluster porque el porcentaje general es mayor a 100%"
                })
            }else if(validacion == true){ /* si la variable validacion es true inserta el nuevo cluster a la colección */
                /* Guardamos en BD */
                cluster.save((err, data) => {
                    /* Si hay Error */
                    if(err){
                        return res.json({
                            status: 400,
                            mensaje: "Error al guardar el Cluster.",
                            err
                        })
                    }
                    /* Si no hay Error */    
                    res.json({
                        status: 200,
                        data,
                        mensaje: "El Cluster ha sido creado con exito."
                    })
                })
            }
    })

}/* addCluster */

/* PETICION PUT PARA EDITAR UN CLUSTER */
let editCluster = (req, res) => {

    /* Requerimos el Modelo */
    const {clusterModel} = require('../modelos/clusters.modelo')(req.conexion)

    let id = req.params.id;
    let body = req.body;
    let suma = 0 //Variable que se encarga de guardar la suma total de los porcentajes que esten actualmente en los documentos de la BD
    let porcentajeInsert = 0;//variable que guarda le valor del porcentaje que se esta recibiendo en el body
    let sumaTotal = 0;//variable que guarda la suma total de los porcentajes que hay en BD y del porcentaje que esta llegando en el body
    let validacion = false;//variable que valida si se puede insertar o no un nuevo cluster dependiendo del resultado de sumaTotal


    /* Buscamos el id que se pasa por parametro del documento a editar */
    clusterModel.findById(id, (err, data) =>{

        /* Validamos que no ocurra error en el proceso */
        if(err){
            return res.json({
                status: 500,
                mensaje: "Error en el servidor",
                err 
            }) 
        }

        /* Validamos que el cluster exista */
        if(!data){
            return res.json({
                status: 400,
                mensaje: "El Cluster no existe en la BD",
                err 
            }) 
        }

        /* Obtenemos los datos del formulario */
        let datosCluster = {
            name: body.name,
            modulo: body.modulo,
            porcentaje: body.porcentaje
        }

        porcentajeInsert = datosCluster.porcentaje
        console.log("Porcentaje a Insertar", porcentajeInsert);

        let resta = 0;
        clusterModel.find({_id:id}, {_id:false, porcentaje:true}).exec((err, data) =>{
            resta = data[0].porcentaje
        })

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
/*             console.log("Suma", typeof(suma))
            console.log("Suma", typeof(porcentajeInsert)) */
            sumaTotal = (suma + Number(porcentajeInsert)) - resta;

            console.log("Suma total antes de Insertar a BD", sumaTotal);

            /* si la sumaTotal es mayor a 1 la variable validacion queda en false y no se podria insertar el nuevo cluster */
            if(sumaTotal > 100) validacion = false;
            /* si la sumaTotal es menor o igual a uno la variable valiacion queda en true habilitando el poder insertar el nuevo cluster */
            else if(sumaTotal <= 100) validacion = true;

            console.log(validacion);
            /* si validacion es false no permite ingresar el nuevo cluster y devuelve una respuesta en json */
            if(!validacion){
                return res.json({
                    status: 401,
                    mensaje: "Error al actualizar el Cluster porque el porcentaje general es mayor a 100%"
                })
            }else if(validacion == true){
                /* Buscamos por medio del ID y actualizamos */
                clusterModel.findByIdAndUpdate(id, datosCluster, {new: true, runValidators: true}, (err, data)=>{
                    if(err){
                        return res.json({
                            status: 400,
                            mensaje: "Error al editar el Cluster",
                            err 
                        }) 
                    }

                    res.json({
                        status: 200,
                        data,
                        mensaje: "El cluster ha sido actualizado con exito."
                    })
                })
            }
        })/* clusterModel.find */
    })

}/* editCluster */

/* PETICION DELETE PARA ELIMINAR UN CLUSTER */
let deleteCluster = (req, res) => {

    /* Requerimos el Modelo */
    const {clusterModel} = require('../modelos/clusters.modelo')(req.conexion)

    //capturamos el ID del Cluster a borrar
    let id = req.params.id;

    //Buscamos el id que se pasa por parametro del documento a eliminar
    clusterModel.findById(id, (err, data) =>{
 
        //Validamos que no ocurra error en el proceso
        if(err){
            return res.json({
                status: 500,
                mensaje: "Error en el servidor",
                err 
            }) 
        }
 
        //Validamos que la categoria exista
        if(!data){
            return res.json({
                status: 400,
                mensaje: "El Cluster no existe en la BD",
                err 
            }) 
        }
 
        //Borramos registro en BD
        clusterModel.findByIdAndRemove(id, (err, data) =>{
            //Validamos que no ocurra error en el proceso
            if(err){
                return res.json({
                    status: 400,
                    mensaje: "Error al Borrar el cluster de BD",
                    err 
                }) 
            }
 
            res.json({
                status: 200,
                data,
                mensaje: "El Cluster ha sido eliminado correctamente de la BD"
            })
        })
    })
}/* deleteCluster */

/* Exportamos las funciones */
module.exports = {addCluster, getClusters, editCluster, deleteCluster}