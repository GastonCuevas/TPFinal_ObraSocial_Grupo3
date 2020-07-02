const Novedades = require('../models/novedades'); 

const novedadesCtrl = {}
novedadesCtrl.getNovedades = async (req, res) => {
    novedades = await Novedades.find().populate("usuario");
    res.json(novedades);
}

novedadesCtrl.getNovedadesId = async (req, res) => {
    const novedades = await Novedades.findById(req.params.id);
    res.json(novedades);
}

novedadesCtrl.createNovedades = async (req, res) => {
    const novedades = new Novedades (req.body);
    await novedades.save();
    res.json({
        'status': 'Novedades saved'
    });
}

novedadesCtrl.editNovedades = async (req, res) => {
    const vNovedades =  new Novedades (req.body);

    await Novedades.findByIdAndUpdate(req.params.id, {$set: vNovedades}, {new: true});
    res.json({
        'status': 'Novedades was updated'
    })
}

novedadesCtrl.deleteNovedades = async (req, res)=>{
    await Novedades.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Novedades removed'
    })
}
module.exports = novedadesCtrl;