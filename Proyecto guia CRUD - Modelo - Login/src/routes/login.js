const express = require('express');
const LoginController = require('../controllers/UserController');


const router = express.Router();

router.get('/login', LoginController.login);
router.get('/register', LoginController.register);
router.post('/register', LoginController.storeUser);
router.post('/login', LoginController.auth);
router.get('/logout', LoginController.logout);

module.exports = router;