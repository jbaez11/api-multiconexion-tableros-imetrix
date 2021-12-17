module.exports = function(conexion){
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    var pruebaSchema = new Schema({
        name : {
            type: String,
            required:[true,"El nombre de la prueba es obligatorio"],
            lowercase: true
        },
        valor : {
            type: Number,
            required:[true,"El valor de la prueba es obligatorio"]
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    })

    let pruebaModel = conexion.model('pruebas', pruebaSchema);
        return {pruebaModel}

};