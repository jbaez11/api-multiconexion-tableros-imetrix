let mostrarScoring = async (req,res)=>{
    
    
    const {scoringkeywordsModel} = require('../modelos/scoringkeywords.modelo')(req.conexion)
    
            let query = req.query;
            console.log("query",query)
            
            let filter = {
                keyfile:query.keyfile
            }
            console.log("filter",filter)
            scoringkeywordsModel.find(filter).exec((err,data)=>{
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

            return scoringkeywordsModel
    
    
}

module.exports = {
    mostrarScoring,
    
}


