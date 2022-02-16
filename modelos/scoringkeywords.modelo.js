

module.exports = function(conexion){
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    var scoringkeywordsSchema = new Schema({
        keyfile : String,
    eventDatetime: Date,
    eventDate:Date,
    agent :{
        name : String,
        identification: String,
        gender:String,
    },
    contents:{
        // aqui indicas que el tipo de dato es Array
        type: Object,
        // aqui lo inicializas por defecto como un array vacío
        default: {}
    },
    createdAt:Date
        
    });


    let scoringkeywordsModel = conexion.model('Scoringkeywords',scoringkeywordsSchema);
        return {scoringkeywordsModel}

};