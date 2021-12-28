module.exports = function(conexion){
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    var categoriaSchema = new Schema({
        name : {
            type: String,
            required:[true,"El nombre de la Categoria es obligatorio"],
            lowercase: true,
            unique: true
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    })

    let categoriaModel = conexion.model('categorias', categoriaSchema);
        return {categoriaModel}

};