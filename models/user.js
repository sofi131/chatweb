const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

// Definir el esquema del usuario
const userSchema = new Schema({
    name:
    {
        type: String,
        required: true,
        // unique: true
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    }

});

// Crear el modelo del usuario
module.exports = mongoose.model('User', userSchema);
