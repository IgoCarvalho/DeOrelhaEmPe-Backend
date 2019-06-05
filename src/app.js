const express = require('express');
const app = express();
const cors = require('cors');
const UserRoutes = require('./routes/user-route');
const DB = require('../config/db');


//Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Iniciando o DB
DB();

//Routes
app.use('/api', UserRoutes);

module.exports = app;