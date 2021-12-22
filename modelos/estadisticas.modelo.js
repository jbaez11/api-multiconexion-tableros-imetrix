

module.exports = function(conexion){
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    var statisticsOfClustersSchema = new Schema({
        eventDate:Date,
        
        contents
        :{
            // aqui indicas que el tipo de dato es Object
            type: Object,
            // aqui lo inicializas por defecto como un Object vacío
            default: {}
        },
        createdAt:Date
    
        
    });


    let estadisticasModel = conexion.model('Statisticsofclusters',statisticsOfClustersSchema);
        return {estadisticasModel}

};