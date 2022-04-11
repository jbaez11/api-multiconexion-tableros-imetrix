let mostrarConsumo = async (req,res)=>{
    //console.log("conexion",req.conexion)
    
    const {consumoModel} = require('../modelos/consumo.modelo')(req.conexion)
    
            let query = req.query;
            
            let filter = {
                eventDate:{$gte:[query.eventDate[0]],$lte:[query.eventDate[1]]}
            }
            console.log("filter",filter)
            consumoModel.find(filter).exec((err,data)=>{
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

            return consumoModel
    
    
}

module.exports = {
    mostrarConsumo
}


