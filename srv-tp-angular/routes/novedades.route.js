const express = require('express');
const router = express.Router();

const novedadesCtrl = require('./../controllers/novedades.controller');

router.get('/', novedadesCtrl.getNovedades);
router.post('/', novedadesCtrl.createNovedades);
router.get('/:id', novedadesCtrl.getNovedadesId);
router.put('/:id', novedadesCtrl.editNovedades);
router.delete('/:id', novedadesCtrl.deleteNovedades);

module.exports = router;