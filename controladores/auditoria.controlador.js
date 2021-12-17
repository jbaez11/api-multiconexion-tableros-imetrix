let mostrarAuditoria = async (req,res)=>{
    
    
    const {auditoriasModel} = require('../modelos/auditoria.modelo')(req.conexion)
    
            let query = req.query;
            console.log("query",query)
            
            let filter = {
                eventDate:{$gte:[query.eventDate[0]],$lte:[query.eventDate[1]]}
            }
            console.log("filter",filter)
            auditoriasModel.find(filter).exec((err,data)=>{
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

            return auditoriasModel
    
    
}

module.exports = {
    mostrarAuditoria,
    
}


