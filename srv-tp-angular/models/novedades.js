const mongoose = require('mongoose');
const Usuario = require('./usuario');
const {Schema} = mongoose;

const NovedadesSchema = new Schema({
    usuario: {type: Schema.Types.ObjectId, ref: Usuario},
    texto: {type: String, required: true},
    estado: {type: String, required: true},
})

module.exports = mongoose.model('Novedades', NovedadesSchema);