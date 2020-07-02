const Afiliado = require('../models/afiliado'); 

const afiliadoCtrl = {}

afiliadoCtrl.getAfiliado = async (req, res) => {
    afiliados = await Afiliado.find();
    res.json(afiliados);
}

afiliadoCtrl.getAfiliadoId = async (req, res) => {
    const afiliado = await Afiliado.findById(req.params.id);
    res.json(afiliado);
}

afiliadoCtrl.createAfiliado = async (req, res) => {
    const afiliados = new Afiliado (req.body);
    await afiliados.save();
    res.json({
        'status': 'Afiliado saved'
    });
}

afiliadoCtrl.editAfiliado = async (req, res) => {
    const vAfiliado =  new Afiliado (req.body);

    await Afiliado.findByIdAndUpdate(req.params.id, {$set: vAfiliado}, {new: true});
    res.json({
        'status': 'Afiliado was updated'
    })
}

afiliadoCtrl.deleteAfiliado = async (req, res)=>{
    await Afiliado.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Afiliado removed'
    })
}
module.exports = afiliadoCtrl;