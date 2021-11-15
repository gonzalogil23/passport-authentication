let mongoose = require("mongoose");

const mensajesCollection = "mensajes";

const MensajesSchema = mongoose.Schema({
  autor: {
    type: {
      nombre: { type: String, require: true },
      lastname: { type: String, require: true },
      alias: { type: String, require: true },
      age: { type: Number, require: true },
    },
  },
  fecha: { type: Date, require: true },
  texto: { type: String, require: true },
});

module.exports = {
  Mensajes: mongoose.model(mensajesCollection, MensajesSchema),
};
