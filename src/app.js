if(process.env.NODE_ENV !== "production"){
	require('dotenv').config();
}


const express = require('express');
const app = express();
const cors = require('cors');
const DB = require('../config/db');
const http = require('http');

const port = process.env.PORT || '3003';
app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server)

app.use((req, res, next)=>{
  req.io = io
  
  next()
})

io.on("connection", soket => {
  console.log(soket.id)
  });

io.on('igo', (aaa)=>{
	console.log(aaa)
})


const UserRoutes = require('./routes/user-route');
const ImagesRoutes = require('./routes/images-route');
const OccurrenceRoutes = require('./routes/occurrence-route');
const AcoesRoutes = require('./routes/acoes-route');



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
app.use('/api', AcoesRoutes);

server.listen(port);
console.log('API rodando na porta ' + port);

module.exports = app;
