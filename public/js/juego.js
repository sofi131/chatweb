const socket = io();
let connectedUsers = document.getElementById("connectedUsers");
let messagesDiv = document.getElementById("messages");

// Maneja el evento 'usuarios' emitido por el servidor
socket.on('usuarios', (usuarios) => {
    connectedUsers.innerHTML = "";
    usuarios.forEach(user => {
        if (!document.getElementById(user._id)) {
            const li = document.createElement('li');
            li.id = user._id;
            li.textContent = user.name;
            connectedUsers.appendChild(li);
        }
    });
});

// Maneja el evento 'mensaje' emitido por el servidor
socket.on('mensaje', (mensaje) => {
    const { _id, name, message } = mensaje;
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${name}: ${message}`;
    messagesDiv.appendChild(messageDiv);
});

// Maneja el clic en el botón de enviar mensaje
document.getElementById("btnEnviar").onclick = () => {
    const texto = document.getElementById("texto").value;
    socket.emit("mensaje", texto);
};
