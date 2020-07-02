const Servicios = require('../models/servicios'); 

const serviciosCtrl = {}
serviciosCtrl.getServicios = async (req, res) => {
    servicios = await Servicios.find().populate("afiliado");
    res.json(servicios);
}

serviciosCtrl.getServiciosId = async (req, res) => {
    const servicios = await Servicios.findById(req.params.id);
    res.json(servicios);
}

serviciosCtrl.createServicios = async (req, res) => {
    const servicios = new Servicios (req.body);
    await servicios.save();
    res.json({
        'status': 'Servicios saved'
    });
}

serviciosCtrl.editServicios = async (req, res) => {
    const vServicios =  new Servicios (req.body);

    await Servicios.findByIdAndUpdate(req.params.id, {$set: vServicios}, {new: true});
    res.json({
        'status': 'Servicios was updated'
    })
}

serviciosCtrl.deleteServicios = async (req, res)=>{
    await Servicios.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Servicios removed'
    })
}
module.exports = serviciosCtrl;