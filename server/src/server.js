const Koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const SERVER_HOST = 'localhost';
const SERVER_PORT = 3333;


const app = new Koa();
//Função do Koa que devolve uma função para trabalhar com requisições
const server = http.createServer(app.callback());
const io = socket(server);

io.on('connection', socket => {
    socket.on('chat.message', data => {
        console.log('[LOG] Message => New message: ', data);
        io.emit('chat.message', data);
    })

    socket.on('disconnect', () => {
        console.log('[LOG] Socket -> Disconnect');
    });
});

//Definindo endereço que ficará ouvindo novas conexões/requisições
server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[LOG] SERVER => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`);
});