const express = require('express');
const rotas = require('./rotas');

const app = express();

app.use(express.json());
app.use(rotas);

const PORT = 3333;
app.listen(PORT);