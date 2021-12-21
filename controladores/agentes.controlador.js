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

//crear agentes

 let crearAgents = (req,res)=>{

    const {baseAgentsModel} = require('../modelos/agentes.modelo')(req.conexion)

     //obtener cuerpo del formulario
    let body = req.body;
    //console.log('body 1' , req.body);
     
    
    //obtener datos del formulario y pasarlos al modelo

     const agents = new baseAgentsModel({
                
        name: body.name.toUpperCase(),
        identification: body.identification,
        gender: body.gender
             
    })

     // guardar en mongo db
     agents.save((err,data)=>{
        if(err){

            return res.json({
            status:400,
            mensaje:"Error al almacenar el agente",
            err
            })
        }

        res.json({
            status:200,
            data,
            mensaje:"El agente ha sido creado con exito"
        })
    });
    
 }

 let editarAgent = (req,res)=>{

    /* Requerimos el Modelos */
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

module.exports = {
    mostrarAgents,
    crearAgents,
    editarAgent
}

