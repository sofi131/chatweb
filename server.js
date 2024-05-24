const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const mongoose = require("mongoose")
const User = require('./models/user');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
// Configura el middleware para manejar datos JSON y datos codificados en URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configura el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/tresenraya')
    .then(() => {
        console.log('Conectado a MongoDB');
    }).catch(err => {
        console.error('Error al conectar a MongoDB', err);
    });

//Login
app.get("/login", (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'login.html'));
    let error = "";
    res.render('login', { error });
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email == "admin@gmail.com" & password == "1234") {
        res.redirect("/juego");
    } else {
        res.render('login', { error: 'Usuario o password incorrecta' });

    }
})
//Juego
app.get("/juego", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'juego.html'));
})
//Register
app.get("/register", (req, res) => {
    let error = "";
    res.render("register", { error });
})

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    let usuario = new User({ name, email, password });
    try {
        await usuario.save();
        res.redirect("/login");
    } catch (error) {
        res.render("register", { error: "Error de conexion a bbdd" });
    }
})
//Puerto
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});