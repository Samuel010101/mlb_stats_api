"use strict";
const { json } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MlbPlayerSchema = Schema({
    name: String,
    team: String,
    position: String,
    age: Number,
    stats: [Number],
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('MlbPlayer', MlbPlayerSchema);
// MlbPlayer --> guarda documentos de este tipo y con estructura dentro de la coleccion
