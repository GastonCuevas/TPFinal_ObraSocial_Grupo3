const Usuario = require ('../models/usuario');

const usuarioCtrl = {}

usuarioCtrl.getUsuario = async (req, res) => {
    usuarios = await Usuario.find();
    res.json(usuarios);
}

usuarioCtrl.getUsuarioId = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
}

usuarioCtrl.createUsuario = async (req, res)=>{
    //en req.body se espera que vengan los datos de usuario a crear
    const usuario = new Usuario (req.body);
    await usuario.save();
    res.json({
        'status': 'Usuario Created'
    });
}

usuarioCtrl.editUsuario = async (req, res) => {
    const vUsuario =  new Usuario (req.body);

    await Usuario.findByIdAndUpdate(req.params.id, {$set: vUsuario}, {new: true});
    res.json({
        'status': 'Usuario was updated'
    })
}

usuarioCtrl.deleteUsuario = async (req, res)=>{
    await Usuario.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Usuario removed'
    })
}

usuarioCtrl.loginUsuario = async (req, res)=>{
    //en req.body se espera que vengan las credenciales de login
    //defino los criterios de busqueda en base al username y password recibidos
    const criteria = {
        usuarioEmail: req.body.usuarioEmail,
        password: req.body.password
    } 
    //el método findOne retorna un objeto que cumpla con los criterios de busqueda
    Usuario.findOne(criteria, function(err, user) {

       //el método findOne retorna un objeto que cumpla con los criterios de busqueda
        if (err) {
            res.json({
                status: 0,
                message: 'error'})
        };
        if (!user) {
            res.json({
                status: 0,
                message: "not found" })
        } else {
            res.json({
                status: 1,
                message: "success",
                usuarioEmail: user.usuarioEmail,
                perfil: user.perfil });
        }
    })
}
//exportacion del modulo controlador
module.exports= usuarioCtrl;
