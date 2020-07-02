const express = require('express');
const router = express.Router();

const noticiasCtrl = require('./../controllers/noticias.controller');

router.get('/', noticiasCtrl.getNoticias);
router.post('/', noticiasCtrl.createNoticias);
router.get('/:id', noticiasCtrl.getNoticiaId);
router.put('/:id', noticiasCtrl.editNoticias);
router.delete('/:id', noticiasCtrl.deleteNoticias);

module.exports = router;