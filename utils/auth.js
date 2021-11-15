function auth(req, res, next) {
  if (req.session.name) {
    return next();
  } else {
    res.redirect("/");
  }
}

module.exports = auth;
