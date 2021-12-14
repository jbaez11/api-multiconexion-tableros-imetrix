

module.exports = function(conexion){
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    var baseAgentSchema = new Schema({
        name : {
            type: String,
            required:[true,"El nombre es obligatorio"],
            uppercase: true,
        },
        
        identification:{
            type: String,
            unique:true,
            required:[true,"La identificación es obligatoria"],
        },
        gender: {
            type: String,
            required:[true,"El genero es obligatorio"],
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
    })


    let baseAgentsModel = conexion.model('Baseagents',baseAgentSchema);
        return {baseAgentsModel}

};