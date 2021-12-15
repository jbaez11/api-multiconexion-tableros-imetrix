

module.exports = function(conexion){
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    var consumoSchema = new Schema({
        eventDate : {
            type: Date,
        },
       
       processedFiles:{
           type: Number,
       },
       unprocessedFiles: {
           type: Number,
       },
       totalFiles: {
           type: Number,
       },
       processedMinutes: {
           type: Number,
       },
       unprocessedMinutes: {
           type: Number,
       },
       totalMinutes: {
           type: Number,
       },
       notes: {
           type: String,
       },
       yearMonthString:{
           type:String,
       },
       dayString:{
           type:String,
       },
       createdAt: { 
            type: Date, 
            
        },
    })


    let consumoModel = conexion.model('Consumptions',consumoSchema);
        return {consumoModel}

};