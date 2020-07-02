const express = require('express');
const router = express.Router();

const serviciosCtrl = require('./../controllers/servicios.controller');

router.get('/', serviciosCtrl.getServicios);
router.post('/', serviciosCtrl.createServicios);
router.get('/:id', serviciosCtrl.getServiciosId);
router.put('/:id', serviciosCtrl.editServicios);
router.delete('/:id', serviciosCtrl.deleteServicios);

module.exports = router;