const mongoose = require('mongoose');
const Afiliado = require('./afiliado');
const {Schema} = mongoose;

const ServiciosSchema = new Schema({
    nombre: {type: String, required: true},
    imagen: {type: String, required: true},
    activo: {type: Boolean, required: true},
    afiliado: {type: Schema.Types.ObjectId, ref: Afiliado}
})

module.exports = mongoose.model('Servicios', ServiciosSchema);