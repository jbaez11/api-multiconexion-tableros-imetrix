let mostrarEstadisticas = async (req,res)=>{
    
    
    const {estadisticasModel} = require('../modelos/estadisticas.modelo')(req.conexion)
    
            let query = req.query;
            console.log("query",query)
            
            let filter = {
                eventDate:{$gte:[query.eventDate[0]],$lte:[query.eventDate[1]]}
            }
            console.log("filter",filter)
            estadisticasModel.find(filter).exec((err,data)=>{
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

            return estadisticasModel
    
    
}

module.exports = {
    mostrarEstadisticas,
    
}


