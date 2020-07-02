const express = require('express');
const router = express.Router();

const afiliadoCtrl = require('./../controllers/afiliado.controller');

router.get('/', afiliadoCtrl.getAfiliado);
router.post('/', afiliadoCtrl.createAfiliado);
router.get('/:id', afiliadoCtrl.getAfiliadoId);
router.put('/:id', afiliadoCtrl.editAfiliado);
router.delete('/:id', afiliadoCtrl.deleteAfiliado);

module.exports = router;