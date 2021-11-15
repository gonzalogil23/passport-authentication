let { CRUDmensajes } = require("../db/mensajes.js");
let mongoose = require("mongoose");
let { Mensajes } = require("../models/mensajes.js");
let { schema } = require("../models/mensajes.entity.js");
let { normalize } = require("normalizr");
let { v4 } = require("uuid");

class NormalizedChat extends CRUDmensajes {
  constructor() {
    super();
    this.id = v4();
  }

  async getMessages() {
    let mensajes = await Mensajes.find({});
    return {
      id: this.id,
      history: mensajes,
    };
  }

  async normalize() {
    let data = await this.getMessages();
    const normalizedData = normalize(data, schema);

    let dataLength = JSON.stringify(data).length;
    let normalizedDataLength = JSON.stringify(normalizedData).length;
    return {
      normalized: normalizedData,
      compression: Math.trunc((1 - dataLength / normalizedDataLength) * 100),
    };
  }
}

module.exports = {
  NormalizedChat,
};
