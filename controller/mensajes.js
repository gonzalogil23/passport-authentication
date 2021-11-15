let { NormalizedChat } = require("./normalizr.js");

let Chat = new NormalizedChat();

const getChat = async () => {
  return await Chat.normalize();
};
const nuevoMensaje = async () => {
  return await Chat.crearMensaje();
};

module.exports = {
  getChat,
  nuevoMensaje,
};
