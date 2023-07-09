const express = require('express');
const router = express.Router();

//const User = require('../models/User')
const userCtrl = require('../controllers/user')

/* Création d'un compte /api/auth/signup*/
router.post('/signup', userCtrl.createUser);
router.post('/login', userCtrl.login);

module.exports = router;