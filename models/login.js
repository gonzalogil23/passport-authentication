let mongoose = require("mongoose");

const usuariosCollection = "usuarios";

const UsuariosSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = {
  Usuarios: mongoose.model(usuariosCollection, UsuariosSchema),
};
