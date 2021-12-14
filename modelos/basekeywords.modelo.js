const mongoose = require('mongoose');
//const conn = require('../config/db');
//const { IgsSufiCO} = require('../config/db');

const Schema = mongoose.Schema;

var baseKeywordsSchema = new Schema({
    keyword : {
        type: String,
        required:[true,"la palabra/frase es obligatoria"],
        uppercase: true,
    },
    
    category:{
        type: String,
        unique:true,
        required:[true,"La categoria es obligatoria"],
    },
    module: {
        type: String,
        required:[true,"El modulo es obligatorio"],
    },
    cluster: {
        type: String,
        required:[true,"El cluster es obligatorio"],
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
})


//let baseKeywordsModelSufi = IgsSufiCO.model('BaseKeywords',baseKeywordsSchema);
//module.exports = {baseKeywordsModelSufi};