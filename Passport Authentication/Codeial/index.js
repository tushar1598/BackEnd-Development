const express = require("express");
const port = 8000;
const app = express();
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");

app.use(express.urlencoded());

app.use(cookieParser());

// assets:-
app.use(express.static("./assets"));

// layout:-
app.use(require("express-ejs-layouts"));

// extract style and script:-
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// view files:-
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo-store is used to store session cookie in db:-
app.use(
  session({
    name: "codeial",
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 100 },
    store: MongoStore.create({
      mongoUrl: "mongodb://0.0.0.0:27017/codeial_pass",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// router:-
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`error in starting my server`);
  }
  console.log(`welcome at my first server on port:- ${port}`);
});
