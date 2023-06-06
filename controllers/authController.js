const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const users = [];


function register(req, res) {
    const { name, email, password } = req.body;


    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'Email já está em uso' });
    }


    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = {
        name,
        email,
        password: hashedPassword,
    };
    users.push(user);

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
}


function login(req, res) {
    const { email, password } = req.body;


    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }


    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const tokenDeAcesso = jwt.sign({
        email: email,
        data: new Date().toISOString(),
    }, config.secret)

    res.json({
        message: 'Login bem-sucedido',
        token: tokenDeAcesso
    });
}

module.exports = {
    register,
    login,
};
