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
    console.log('body 1' , req.body);
     
    
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

    const {baseAgentsModel} = require('../modelos/agentes.modelo')(req.conexion)
    console.log('host',req.params.bd )
    //capturar id del admin

    let id = req.params.id;
    console.log('id',id)

    //obtener el cuerpo del formulario

    let body = req.body;
    console.log("body",body);

    baseAgentsModel.findById(id,(err,data) => {
        // validar que no se tenga error en la BD

        if(err){
            return res.json({
                status:500,
                mensaje: "Error en el servidor",
                err
            })
        }

        //validar existencia del admin

        if(!data){
            return res.json({
                status:404,
                mensaje: "El Agente no existe en la BD",
                
            })

        }

        // 3. actualizar registros

        let cambiarRegistrosBD = (id,body)=>{
            return new Promise((resolve,reject)=>{

                let datosAgents = {
                    name : body.name,
                    identification : body.identification,
                    gender : body.gender,
                }
        
                //actualizar en mongoDB
        
                baseAgentsModel.findByIdAndUpdate(id,datosAgents, {new:true,runValidators:true}, (err,data) => {
                    if(err){
                        let respuesta = {
                            res:res,
                            error:err
                        }

                        reject(respuesta);
                        // return res.json({
                        //     status:400,
                        //     mensaje: "Error al editar slide",
                        //     err
                        // }) 
                    }
        
                    

                    let respuesta = {
                        res:res,
                        data:data
                    }
                    resolve(respuesta);
                })

                cambiarRegistrosBD(id,body).then(respuesta =>{
                    respuesta["res"].json({
                        status:200,
                        data: respuesta["data"],
                        mensaje: "El Agente ha sido actualizado con exito"
                    })
                }).catch(respuesta =>{
                    respuesta["res"].json({
                        status:400,
                        err: respuesta["err"],
                        mensaje: "Error al editar el Agente"
                    }) 
                })

            })

        }
    })
    


 
}





module.exports = {
    mostrarAgents,
    crearAgents,
    editarAgent,
}

