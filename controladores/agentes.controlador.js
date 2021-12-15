


let mostrarAgents = async (req,res)=>{
    //console.log("conexion",req.conexion)
    
    const {baseAgentsModel} = require('../modelos/agentes.modelo')(req.conexion)
    
        
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

let crearAgents = async (req,res)=>{

    const {baseAgentsModel} = require('../modelos/agentes.modelo')(req.conexion)
    console.log('host2',req.params.bd )

     //obtener cuerpo del formulario

     let body = req.body;
     console.log('body 2' , req.body);
     
    

    const agents = new baseAgentsModel({
                
         name: body.name,
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



module.exports = {
    mostrarAgents,
    crearAgents
}

