let mostrarKeywords = async (req,res)=>{
    
    
    const {keywordsModel} = require('../modelos/keywords.modelo')(req.conexion)
    
            let query = req.query;
            console.log("query",query)
            
            let filter = {
                keyfile:query.keyfile
            }
            console.log("filter",filter)
            keywordsModel.find(filter).exec((err,data)=>{
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

            return keywordsModel
    
    
}

module.exports = {
    mostrarKeywords,
    
}


