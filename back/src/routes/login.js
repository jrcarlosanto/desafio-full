const express = require('express');
const { email } = require('../middlewares/email.middleware');
const { password } = require('../middlewares/password.middleware');
const { login } = require('../services/login.service');
const { generateToken } = require('../utils/generateToken');

const router = express.Router();

router.post('/login', email, password, async (req, res) => {
    const obj = req.body;
    const user = await login(obj);
    if (user) {
        const authorization = generateToken();
        res.status(200).json({ ...user, authorization });
    } else {
        res.status(404).json({ message: 'email ou senha incorretos' });
    }
});

module.exports = router;