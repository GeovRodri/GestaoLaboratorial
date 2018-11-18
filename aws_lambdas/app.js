'use strict';
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const category = require('./category');
const laboratory = require('./laboratory');
const reserve = require('./reserve');

app.use('/category', category);
app.use('/laboratory', laboratory);
app.use('/reserve', reserve);

app.listen(port);
module.exports = app;
