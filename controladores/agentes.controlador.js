let mostrarAgents = async (req,res)=>{
    //console.log("conexion",req.conexion)
    
    const {baseAgentsModel} = require('../modelos/agentes.modelo')(req.conexion)
    console.log('host',req.params.bd )
        
            baseAgentsModel.find({}).exec((err,data)=>{
                if(err){
                    return res.json({
                        status : 500,
                        mensaje: "Error en la petición"
                    })
                }
        
                res.json({
                    status: 200,
                    data
                })
            })

            return baseAgentsModel
    
}

/* CREAR AGENTE */
let crearAgents = (req,res)=>{

    const {baseAgentsModel} = require('../modelos/agentes.modelo')(req.conexion)

    /* Obtenemos el cuerpo del formulario */
    let body = req.body;

    /* Obtenemos los datos del formulario */
    const agents = new baseAgentsModel({
                
        name: body.name.toUpperCase(),
        identification: body.identification,
        gender: body.gender
             
    })

    /* Guardamos en BD */
    agents.save((err,data)=>{
        /* Si hay Error */
        if(err){
            return res.json({
            status:400,
            mensaje:"Error al almacenar el agente",
            err
            })
        }
        /* Si no hay Error */
        res.json({
            status:200,
            data,
            mensaje:"El agente ha sido creado con exito"
        })
    });
    
}

/* EDITAR AGENTE */
let editarAgent = (req,res)=>{

    /* Requerimos el Modelo */
    const {baseAgentsModel} = require('../modelos/agentes.modelo')(req.conexion)

    /* Obtenemos el id */
    let id = req.params.id;
    let body = req.body;
    
    /* Buscamos el id que se pasa por parametro del documento a editar */
    baseAgentsModel.findById(id,(err,data) => {
       
        /* Validamos que no ocurra error en el proceso */
        if(err){
            return res.json({
                status:500,
                mensaje: "Error en el servidor",
                err
            })
        }

        /* Validamos que el agente exista */
        if(!data){
            return res.json({
                status:404,
                mensaje: "El Agente no existe en la BD",
                err
            })
        }

        /* Obtenemos los datos del formulario */
        let datosAgentes = {
            name: body.name,
            identification: body.identification,
            gender: body.gender
        }

               /* Buscamos por medio del ID y actualizamos */
               baseAgentsModel.findByIdAndUpdate(id, datosAgentes, {new: true, runValidators: true}, (err, data)=>{
                if(err){
                    return res.json({
                        status: 400,
                        mensaje: "Error al editar el agente.",
                        err 
                    }) 
                }
    
                res.json({
                    status: 200,
                    data,
                    mensaje: "El agente ha sido actualizado con exito."
                })
            })

    })
}

/* Exportamos las Funciones */
module.exports = {
    mostrarAgents,
    crearAgents,
    editarAgent
}

