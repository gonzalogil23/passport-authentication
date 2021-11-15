const session = require("express-session");

function setName(req, res) {
  console.log(req.body);
  const { nombre } = req.body;
  if (nombre) {
    res
      .cookie("nombre", nombre, { maxAge: 60000 })
      .send("Bienvenido " + nombre);
    return res.redirect("/");
  } else {
    res.send(404);
  }
}

function destroySession(req, res) {
  const { name } = req.session;
  req.session.destroy(() => res.clearCookie("connect.sid"));
  return res.render("disconnect_user", { user: name });
}

function welcome(req, res) {
  const { name } = req.body;
  res.send(`Welcome ${name}`);
}

module.exports = {
  setName,
  destroySession,
  welcome,
};
