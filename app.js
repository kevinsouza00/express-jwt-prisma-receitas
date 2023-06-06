
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
    res.send('Bem vindo!');
});


app.use(bodyParser.json());


app.use('/api', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipe'));


app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
