const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp');

const bookCtrl = require('../controllers/book')

router.post('/:id/rating', auth, bookCtrl.rateBook);
router.get('/bestrating', bookCtrl.getBestBooks);
router.post('/', auth, multer,sharp, bookCtrl.createBook);
router.get('/', bookCtrl.getBooks);
router.get('/:id', bookCtrl.getOneBook);
router.delete('/:id', auth, bookCtrl.deleteOneBook);
router.put('/:id', auth, multer, sharp, bookCtrl.updateBook);

module.exports = router;