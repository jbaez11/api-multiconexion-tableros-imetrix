let mostrarConsumo = async (req,res)=>{
    //console.log("conexion",req.conexion)
    
    const {consumoModel} = require('../modelos/consumo.modelo')(req.conexion)
    
        
            consumoModel.find({}).exec((err,data)=>{
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
    mostrarConsumo,
    
}


