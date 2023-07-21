const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const bookCtrl = require('../controllers/book')

/* Création d'un book*/
router.post('/', auth, multer, bookCtrl.createThing);
router.get('/', bookCtrl.getBooks);

module.exports = router;