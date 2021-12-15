module.exports = function(conexion){
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    var clusterSchema = new Schema({
        name : {
            type: String,
            required:[true,"El nombre del Modulo es obligatorio"],
            lowercase: true
        },
        modulo:{
            type: Schema.Types.ObjectId, 
            ref: 'modulos', 
            required: [true, "El modulo es obligatorio."]
        },
        porcentaje:{
            type: Number,
            required: [true, "El porcentaje del cluster no puede estar vacio."]
        },
        createdAt : { 
            type: Date, 
            default: Date.now 
        }
    })

    let clusterModel = conexion.model('clusters', clusterSchema);
        return {clusterModel}

};