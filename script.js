//client side javascript
const socket = io("http://localhost:8080");

const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const name = prompt("What is your name?");
appendMessage("You Joined!");
socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessage(data.name +": " + data.message);
})

socket.on('user-connected', name => {
    appendMessage(name + " connected");
})

socket.on('disconnected', name => {
    appendMessage(name + " disconnected");
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-chat-msg', message);
    appendMessage("You: " + message);
    messageInput.value = '';
})

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    document.getElementById('message-container').append(messageElement);
}