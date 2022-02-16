

module.exports = function(conexion){
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    var conversationsSchema = new Schema({
        eventDate:Date,
    agentsSummary :{
        type:Object,
        default:{}
    },
    recordingsSummary
    :{
        // aqui indicas que el tipo de dato es Array
        type: Object,
        // aqui lo inicializas por defecto como un array vacío
        default: {}
    },
    createdAt:Date

    })


    let conversationsModel = conexion.model('Auditconversations',conversationsSchema);
        return {conversationsModel}

};