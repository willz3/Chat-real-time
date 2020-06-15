const express = require('express');
const http = require('http');
const socket = require('socket.io');
const router = require('./router');
const cors = require('cors');
const {dateNowMessage, hourNowMessage} = require('./utils/DateUtil');

const app = express();
const server = http.createServer(app);
const io = socket(server);


const { addUser, removeUser, getUser, getUsersInRoom } = require('./database/repositories/UserRepository');

io.on('connection', socket => {
    socket.on('join', ({ nickname, room }, callBack) => {
        const { error, user } = addUser({ id: socket.id, nickname, room });

        if(error)
            return callBack(error);

        //Notificando todas as rooms que um usuário entrou em uma room
        socket.emit('message', {
            user: 'Admin',
            message: `${user.nickname} entrou na sala!`,
            date: dateNowMessage(),
            hour: hourNowMessage()
        });

        //Especificando para qual sala enviar a mensagem, no caso a que o usuário acabou de entrar.
        //O broadcast vai enviar e mensagem para todos da sala, exceto o que acabou de entrar.
        socket.broadcast.to(user.room).emit('message', {
            user: 'Admin',
            message: `${user.nickname} entrou na sala!`,
            date: dateNowMessage(),
            hour: hourNowMessage()
        });
        socket.join(user.room);
        //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callBack();
    });

    socket.on('sendMessage', data => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', data);
        //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        io.to(user.room).emit('message', {
            user: user.nickname,
            message: `${user.nickname} saiu!`,
            date: dateNowMessage(),
            hour: hourNowMessage()
        })
    })
})

app.use(cors());
app.use(router)

//Definindo endereço que ficará ouvindo novas conexões/requisições
server.listen(3333);