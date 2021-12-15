module.exports = function(conexion){
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    var keyWordsSchema = new Schema({
        name : {
            type: String,
            required:[true, "El nombre de la Keyword o Frase es obligatorio"],
            lowercase: true
        },
        cluster:{
            type: Schema.Types.ObjectId, 
            ref: 'clusters', 
            required: [true, "El cluster es obligatorio."]
        },
        createdAt : { 
            type: Date, 
            default: Date.now 
        }
    })

    let keyWordsModel = conexion.model('finalkeywords', keyWordsSchema);
        return {keyWordsModel}

};