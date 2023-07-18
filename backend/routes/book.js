const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const bookCtrl = require('../controllers/book')

/* Création d'un book*/
router.post('/books', auth, multer, bookCtrl.createThing);

module.exports = router;