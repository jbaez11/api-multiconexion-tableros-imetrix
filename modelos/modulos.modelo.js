module.exports = function(conexion){
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    var moduloSchema = new Schema({
        name : {
            type: String,
            required:[true,"El nombre del Modulo es obligatorio"],
            lowercase: true,
            unique: true
        },
        categoria : {
            type: Schema.Types.ObjectId, 
            ref: 'categorias', 
            required: [true, "La categoria es obligatoria!!."],
            lowercase: true
        },
        createdAt : { 
            type: Date, 
            default: Date.now 
        }
    })

    let moduloModel = conexion.model('Modulo', moduloSchema);
        return {moduloModel}

};