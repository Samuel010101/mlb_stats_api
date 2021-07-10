const { json } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MlbPlayerSchema = Schema({
    name: String,
    team: String,
    position: String,
    age: Number,
    stats: {
        j: Number,
        tb: Number,
        ca: Number,
        ce: Number,
        hs: Number,
        hr: Number,
        pro: Number
    },
    date: {type: Date, default: Date.now}
    
});

module.exports = mongoose.model('MlbPlayer', MlbPlayerSchema)
// Estudios --> guarda documentos de este tipo y con estructura dentro de la coleccion