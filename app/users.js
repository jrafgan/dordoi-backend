const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authMiddl = require('../middleware/auth');
const { createToken } = require("../middleware/functions");

router.post('/register', async (req, res) => {
    console.log('req body : ', req.body);
    let userData = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    };

    if (req.file) {
        userData.image = req.file.filename;
    }

    const user = new User(userData);

    try {
        await user.save();

        // Создание JWT токена после успешной регистрации
        const token = createToken(user._id);

        // Отправка токена клиенту в ответе
        return res.send({ message: 'User registered', user, token });
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send({ error: 'User does not exist' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({ error: 'Username/Password incorrect' });
    }

    // Создание JWT токена после успешной аутентификации
    const token = createToken(user._id);

    // Отправка токена клиенту в ответе
    res.send({ message: 'Login successful', user, token });
});

router.post('/session', authMiddl, async (req, res) => {
    const userData = req.auth;
    console.log('token validation in action : ', userData);
    const newToken = createToken(userData.userId);

    // Отправляем новый токен на клиент
    const user = await User.findOne({ _id: userData.userId });

    // Отправляем новый токен на клиент
    res.send({ token: newToken,  message: 'User authorized!',  user });
});

router.delete('/session', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Logged out'};
    if (!token) {
        return res.send(success);
    }
    const user = await User.findOne({token});
    if (!user) {
        return res.send(success);
    }
    await user.save();
    return res.send(success);
});

router.put('/', authMiddl, async (req, res) => {
    await req.user.save();
    res.sendStatus(200);
});


module.exports = router;
