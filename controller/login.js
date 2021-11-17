function getLogin(req, res) {
  if (req.isAuthenticated()) {
    let { username, email, password } = req.body;
    console.log("user logueado");
    res.render("login-ok", {
      usuario: username,
      password: password,
      email: email,
    });
  } else {
    console.log("user NO logueado");
    res.sendFile(__dirname + "../public/index.html");
  }
}
function postLogin(req, res) {
  let user = req.body;

  res.sendFile(__dirname + "../public/index.html");
}
function postSignup(req, res) {
  let user = req.body;
  res.redirect("/");
  // res.sendFile(__dirname + "../public/index.html");
}

function getSignup(req, res) {
  res.sendFile(__dirname + "../public/signup.html");
}

function getLogout(req, res) {
  req.logout();
  res.redirect("/");
}
function getFaillogin(req, res) {
  console.log("error en login");
  res.send("login-error");
}

function getFailsignup(req, res) {
  console.log("error en signup");
  res.send("signup-error");
}

module.exports = {
  getLogin,
  getLogout,
  getSignup,
  postLogin,
  postSignup,
  getFaillogin,
  getFailsignup,
};
