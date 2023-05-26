const express = require("express");
const port = 8000;
const app = express();
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

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

// router:-
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`error in starting my server`);
  }
  console.log(`welcome at my first server on port:- ${port}`);
});
