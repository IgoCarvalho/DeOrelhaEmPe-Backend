if(process.env.NODE_ENV !== "production"){
	require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const DB = require('../config/db');


const UserRoutes = require('./routes/user-route');
const ImagesRoutes = require('./routes/images-route');
const OccurrenceRoutes = require('./routes/occurrence-route');



//Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Iniciando o DB
DB(process.env.MONGODB_URI);

//Routes
app.use('/api', UserRoutes);
app.use('/api', ImagesRoutes);
app.use('/api', OccurrenceRoutes);

module.exports = app;
