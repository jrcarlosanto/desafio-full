const express = require('express');
const cors = require('cors');

const LoginRoutes = require('./routes/login');
const UserRoutes = require('./routes/user');

const app = express();

app.use(express.json());
app.use(cors());

app.use(LoginRoutes);
app.use(UserRoutes);

module.exports = app;
