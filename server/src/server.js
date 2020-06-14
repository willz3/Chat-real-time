const express = require('express');
const http = require('http');
const socket = require('socket.io');
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', socket => {
    console.log(`New connection: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('User had left!')
    })
})

app.use(router)

//Definindo endereço que ficará ouvindo novas conexões/requisições
server.listen(3333);