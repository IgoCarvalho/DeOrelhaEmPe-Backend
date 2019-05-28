const express = require('express');
const app = express();
const cors = require('cors');
const UserRoutes = require('./src/routes/UserRoute');
const DB = require('./config/db');


//Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Iniciando o DB
DB();

//Routes
app.use('/api', UserRoutes);

app.listen(3003, ()=>{
    console.log(`servidor rodando na porta 3003`);
})
