let mongoose = require("mongoose");
let { Mensajes } = require("../models/mensajes.js");

class CRUDmensajes {
  constructor() {
    this.getMensajes = async () => {
      let mensajes = await Mensajes.find({});
      return mensajes;
    };

    this.crearMensaje = async (data) => {
      let mensaje = new Mensajes(data);
      let mensajeNuevo = await mensaje.save();
      return mensajeNuevo;
    };

    this.findMensajeByID = async (id) => {
      try {
        const [element] = await Mensajes.find({ _id: ObjectId(id) });
        return element;
      } catch (error) {
        throw new Error(error);
      }
    };

    this.updateMensaje = async (id, props) => {
      try {
        let mensajeActualizado = await Mensajes.updateOne(
          { _id: ObjectId(id) },
          { $set: { ...properties } }
        );
        return mensajeActualizado;
      } catch (error) {
        throw new Error(error);
      }
    };

    this.deleteMensaje = async (id) => {
      try {
        const item = await this.findMensajeByID(id);
        if (item) {
          await Mensajes.deleteOne({ _id: ObjectId(id) });
          return item;
        }
      } catch (error) {
        throw new Error(error);
      }
    };

    this.disconnection = async () => await mongoose.connection.close();
  }
}

module.exports = {
  CRUDmensajes,
};
