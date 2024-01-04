const express = require('express');
const cors = require('cors');

const LoginRoutes = require('./routes/login');

const app = express();

app.use(express.json());
app.use(cors());

app.use(LoginRoutes);

module.exports = app;
