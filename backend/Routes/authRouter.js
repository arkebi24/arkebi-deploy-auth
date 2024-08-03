const { register, login, logout } = require('../Controllers/authController');
const { registerValidation, loginValidation } = require('../Middlewares/authValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/register', registerValidation, register);
router.post('/logout', logout);

module.exports = router;