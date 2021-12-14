


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

     //obtener cuerpo del formulario

     let body = req.body;
    console.log('body 1' , req.body);
     
    let agents;

     switch(req.params.bd){
         
             

         case 'igsSufiCO':

             //obtener datos del formulario y pasarlos al modelo

              agents = new baseAgentsModel({
                
                 name: body.name.toUpperCase(),
                 identification: body.identification,
                 gender: body.gender

                
             })

             break;
             


     }

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

