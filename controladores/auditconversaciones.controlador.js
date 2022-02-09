let mostrarConversacion = async (req,res)=>{
    
    
    const {conversationsModel} = require('../modelos/auditconversaciones.modelo')(req.conexion)
    
            let query = req.query;
            console.log("query",query)
            
            let filter = {
                eventDate:query.eventDate
            }
            console.log("filter",filter)
            conversationsModel.find(filter).exec((err,data)=>{
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

            return conversationsModel
    
    
}

module.exports = {
    mostrarConversacion,
    
}


