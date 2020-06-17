const users = [];

const addUser = ({ id, nickname, room }) => {
    nickname = nickname.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if(!nickname)
        return { error: 'Nome de usuário vázio!' }

    const existingUser = users.find((user) => user.room === room && user.nickname === nickname);

    if(existingUser)
        return { error: 'Seu nome de usuário ja está sendo utilizado!' }

    const user = {id, nickname, room};

    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1)
        return users.splice(index, 1)[0];
}

const getUser = (id) => {
    return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };