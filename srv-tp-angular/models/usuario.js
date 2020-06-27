const mongoose = require("mongoose");
const {Schema} = mongoose;

const UsuarioSchema = new Schema({
usuarioEmail: {type: String, required: true}, 
password: {type:String, required:true},
activo: {type:Boolean, required:true},
perfil: {type:String, required: true} //-- administrador – afiliado -- administrativo  
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
