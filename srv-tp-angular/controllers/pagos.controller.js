const Pagos = require('../models/pagos'); 

const pagosCtrl = {}
pagosCtrl.getPagos = async (req, res) => {
    pagos = await Pagos.find().populate("afiliado");
    res.json(pagos);
}

pagosCtrl.getPagosId = async (req, res) => {
    const pagos = await Pagos.findById(req.params.id);
    res.json(pagos);
}

pagosCtrl.createPagos = async (req, res) => {
    const pagos = new Pagos (req.body);
    await pagos.save();
    res.json({
        'status': 'Pagos saved'
    });
}

pagosCtrl.editPagos = async (req, res) => {
    const vPagos =  new Pagos (req.body);

    await Pagos.findByIdAndUpdate(req.params.id, {$set: vPagos}, {new: true});
    res.json({
        'status': 'Pagos was updated'
    })
}

pagosCtrl.deletePagos = async (req, res)=>{
    await Pagos.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Pagos removed'
    })
}
module.exports = pagosCtrl;