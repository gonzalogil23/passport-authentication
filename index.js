const express = require("express");
const app = express();
let mongoose = require("mongoose");
let { productosRouter } = require("./routes/productos.js");
let { Productos } = require("./models/productos.js");
let { CRUDproductos } = require("./db/productos.js");
let cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const http = require("http").Server(app);
const PORT = 8080;

http.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(passport.initialize());
app.use(passport.session());
const io = require("socket.io")(http);

app.use("/productos", productosRouter);

// app.use(
//   session({
//     store: MongoStore.create({
//       mongoUrl:
//         "mongodb+srv://gonzalogil:gonzalogil@cluster0.lvfuy.mongodb.net/cookies?retryWrites=true&w=majority",
//       mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
//       ttl: 600,
//     }),
//     secret: "123456",
//     resave: false,
//     saveUninitialized: false,
//     rolling: true,
//     cookie: {
//       maxAge: 600000,
//     },
//   })
// );

// *** PASSPORT *** //
let { Usuarios } = require("./models/login.js");
const {
  getLogin,
  getLogout,
  postLogin,
  getSignup,
  postSignup,
  getFaillogin,
  getFailsignup,
} = require("./controller/login.js");

passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      Usuarios.findOne({ username: username }, function (err, user) {
        if (err) return done(err);
        if (!user) {
          console.log(`Usuario ${username} no encontrado`);
          return done(null, false, console.log("message", "User Not found."));
        }
        if (!isValidPassword(user, password)) {
          console.log("Invalid Password");
          return done(null, false, console.log("message", "Invalid Password"));
        }
        return done(null, user);
      });
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      findOrCreateUser = function () {
        Usuarios.findOne({ username: username }, function (err, user) {
          if (err) {
            console.log("Error in SignUp: " + err);
            return done(err);
          }
          if (user) {
            console.log("User already exists");
            return done(
              null,
              false,
              console.log("message", "User Already Exists")
            );
          } else {
            let newUser = new Usuarios();

            newUser.username = username;
            newUser.password = password;
            newUser.email = req.body.email;

            newUser.save(function (err) {
              if (err) {
                console.log("Error in Saving user: " + err);
                throw err;
              }
              console.log("Usuario registrado con éxito");
              return done(null, newUser);
            });
          }
        });
      };
      process.nextTick(findOrCreateUser);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  Usuarios.findById(id, function (err, user) {
    done(err, user);
  });
});

app.get("/login", getLogin);
app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  postLogin
);
app.get("/faillogin", getFaillogin);

//  SIGNUP
app.get("/signup", getSignup);
app.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  postSignup
);
app.get("/failsignup", getFailsignup);

//  LOGOUT
app.get("/logout", getLogout);

const mensajes = [];

ConectandoaBD();

async function ConectandoaBD() {
  try {
    const URI = "mongodb://localhost:27017/ecommerce";
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Productos.deleteMany({});
    await Productos.insertMany(this.products, (error) => {
      if (error) {
        throw ` Error al grabar productos ${error}`;
      } else {
        console.log(`Productos grabados...`);
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
let { getChat, nuevoMensaje } = require("./controller/mensajes.js");

let db = new CRUDproductos();

io.on("connection", async (socket) => {
  console.log("conectado!");
  socket.on("broadcast", db.products);
  socket.on("nuevo", async (data) => {
    mensajes.push(data);
    io.sockets.emit("mensajes", mensajes);
    let mensaje = await nuevoMensaje(data);
    io.socket.emit("nuevo-mensaje", mensaje);
  });
  getData();
});

async function getData() {
  try {
    let chat = await getChat();
    socket.emit("data", chat);
  } catch (e) {
    throw new Error(e);
  }
}
