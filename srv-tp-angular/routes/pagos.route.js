const express = require('express');
const router = express.Router();

const pagosCtrl = require('./../controllers/pagos.controller');

router.get('/', pagosCtrl.getPagos);
router.post('/', pagosCtrl.createPagos);
router.get('/:id', pagosCtrl.getPagosId);
router.put('/:id', pagosCtrl.editPagos);
router.delete('/:id', pagosCtrl.deletePagos);

module.exports = router;