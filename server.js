const PORT_NUMBER = 8080;
const io = require('socket.io')(PORT_NUMBER);

const users = {};

io.on('connection', socket => {
    socket.on('send-chat-msg', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
    })
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    })
    socket.on('disconnected', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    })
});