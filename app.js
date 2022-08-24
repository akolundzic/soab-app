const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");
const eventsrouter = require("./routes/events");
const posteventrouter = require("./routes/events");
const userroutes = require("./routes/users");
require("dotenv").config();
//connection to database
mongoose.connect(process.env.PW_CONNECT);
const db = mongoose.connection;
// view engine
app.set("view engine", "ejs");
//----Middleware ----
app.use(express.urlencoded({ extended: true })); //input from form ejs
app.use(cookieParser());
app.use(express.json());
app.use("/", posteventrouter);
app.use("/", eventsrouter);
app.use("/auth", userroutes);

//test connection status
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
// Set view engine as EJS
app.engine("html", require("ejs").renderFile);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("home");
});

// error handler
// /--- Server listeing -----
let server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Server listening at http://%s:%s", host, port);
});
module.exports = app;
