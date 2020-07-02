const Noticias = require('../models/noticias'); 

const noticiasCtrl = {}
noticiasCtrl.getNoticias = async (req, res) => {
    noticias = await Noticias.find().populate("usuario");
    res.json(noticias);
}

noticiasCtrl.getNoticiaId = async (req, res) => {
    const noticias = await Noticias.findById(req.params.id);
    res.json(noticias);
}

noticiasCtrl.createNoticias = async (req, res) => {
    const noticias = new Noticias (req.body);
    await noticias.save();
    res.json({
        'status': 'Noticias saved'
    });
}

noticiasCtrl.editNoticias = async (req, res) => {
    const vNoticias =  new Noticias (req.body);

    await Noticias.findByIdAndUpdate(req.params.id, {$set: vNoticias}, {new: true});
    res.json({
        'status': 'Noticias was updated'
    })
}

noticiasCtrl.deleteNoticias = async (req, res)=>{
    await Noticias.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Noticias removed'
    })
}
module.exports = noticiasCtrl;