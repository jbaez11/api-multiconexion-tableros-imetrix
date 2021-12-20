module.exports = function(conexion){
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    var keywordsSchema = new Schema({
        keyfile : String,
        eventDatetime: Date,
        eventDate:Date,
        agent :{keywordsme : String,
            identification: String,
            gender:String,
            createdAt:Date,
        },
        keywords:{
            // aqui indicas que el tipo de dato es Array
            type: Object,
            // aqui lo inicializas por defecto como un array vacío
            default: {}
        },
        createdAt:Date
    
        
    });

    let keywordsModel = conexion.model('keywords', keywordsSchema);
        return {keywordsModel}

};