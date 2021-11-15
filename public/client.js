const socket = io();

socket.on("broadcast", (data) => {
  let tabla = document.getElementById("tabla");
  const productos = data.map((product) => {
    return `<tr><th scope="row">${product.id}</th><td>${product.title}</td><td>${product.price}</td><td>${product.thumbnail}</td>`;
  });
  tabla.innerHTML = productos;
});

socket.on("data", (chat) => {
  renderChat(chat);
});

const renderChat = ({ normalized, compression }) => {
  const denormalizedChat = denormalizeMessages(normalized).history;
  document.getElementById("chat").innerHTML = denormalizedChat;
  let compresión = `Compresión del ${compression}%`;
  document.getElementById("compression").innerHTML = compresión;
};

socket.on("nuevo-mensaje", (data) => {
  render(data);
});

let render = ({ author, fecha, texto }) => {
  let html = `
  <ul class="list-group">
  <li class="list-group-item" style="color: blue" >${author.nombre}</li>
  <li class="list-group-item "style="color: blue">${author.lastname}</li>
  <li class="list-group-item "style="color: red">${author.age}</li>
  <li class="list-group-item"><em> ${author.autor}</em></li>
  <li class="list-group-item">${author.alias}</li>
  <li class="list-group-item" style="color: brown">${fecha}</li>
  <li class="list-group-item" style= "color: green"> <strong>${texto}</strong></li>
</ul>`;
  document.getElementById("chat").innerHTML = html;
};

function mensaje(event) {
  event.preventDefault();

  let autor = document.getElementById("mail").value;
  let nombre = document.getElementById("name").value;
  let lastname = document.getElementById("lastname").value;
  let alias = document.getElementById("alias").value;
  let age = document.getElementById("age").value;
  let texto = document.getElementById("message").value;
  let fecha = new Date();
  const author = {
    autor: autor,
    nombre: nombre,
    lastname: lastname,
    alias: alias,
    age: age,
  };
  const message = {
    author,
    texto: texto,
    fecha: fecha,
  };
  socket.emit("nuevo", message);
}

function denormalizeMessages(normalizedMessages) {
  const {
    schema: { Entity },
    denormalize,
  } = require("normalizr");

  const authors = new Entity("authors", {}, { idAttribute: "email" });

  const messages = new Entity("messages", {
    author: authors,
  });

  const chat = new Entity("chat", {
    history: [messages],
  });

  const chatDenormalized = denormalize(
    normalizedMessages.result,
    chat,
    normalizedMessages.entities
  );
  return chatDenormalized;
}
