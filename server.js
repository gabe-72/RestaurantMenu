const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require("./Models/UserModel");
const app = express();

// setup the the moongodb session
let mongoStore = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/a4",
  collection: "sessions",
  clear_interval: 3600
});

// setting up the session and view engine
app.use(session({
  secret: "chocolate bananas",
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  saveUninitialized: false,
  store: mongoStore
}));
app.set("view engine", "pug");

// setting the routes
app.use("/", function(req, res, next) {
  console.log(`${req.method}: ${req.url}`);
  next();
});
app.use(express.static("public"));

// set up the routers
let userRouter = require("./routers/user-router");
app.use("/users", userRouter);
let orderRouter = require("./routers/order-router");
app.use("/orders", orderRouter);

// GET routes
app.get("/", sendHomepage);
app.get("/register", sendRegister);
app.get("/login", sendLogin);
app.get("/logout", logout);
app.get("/orderform", sendOrderForm);

// POST routes
app.use(express.json());
app.post("/register", register);
app.post("/login", login);

/**
 * Sends the homepage
 */
function sendHomepage(req, res) {
  res.render("pages/homepage", { user: req.session });
}

/**
 * Sends the order form
 */
function sendOrderForm(req, res) {
  if (!req.session.loggedin)
    return res.status(401).send("You have to be logged in to view this page");
  res.render("pages/orderform", { user: req.session });
}

/**
 * Sends the register page
 */
function sendRegister(req, res) {
  res.render("pages/register", { user: req.session });
}

/**
 * Sends the login page
 */
function sendLogin(req, res) {
  res.render("pages/login", { user: req.session });
}

/**
 * Registers a new user
 */
function register(req, res) {
  if (req.session.loggedin) {
    res.status(200).send("Already Logged in");
    return;
  }
  User.findUser(req.body.username, function(user) {
    if (user == null) { // no existing user with the same username
      user = { // create new user
        username: req.body.username,
        password: req.body.password,
        privacy: false
      };
      let newUser = User(user);
      newUser.save(function(err, result) {
        if (err) {
          res.status(500).send("Could not save user");
          return;
        }
        req.session.loggedin = true; // log in as the new user
        req.session.userid = result._id;
        res.redirect("/users/"+result._id);
      });
    } else { // user with username already exists
      res.status(400).send("Username has been taken");
    }
  });
}

/**
 * Logs in as a user
 */
function login(req, res) {
  if (req.session.loggedin) {
    res.status(200).send("Already Logged in");
    return;
  }
  User.findUser(req.body.username, function(user) {
    if (user != null && user.password === req.body.password) {
      req.session.loggedin = true;
      req.session.userid = user._id;
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });
}

/**
 * Logs the session out
 */
function logout(req, res) {
  if (req.session)
    req.session.destroy();
  res.redirect("/");
}

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/a4', {useNewUrlParser: true});
let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function() {
  app.listen(3000);
  console.log("Listening on port 3000");
});