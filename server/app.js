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
mongoose.connect(process.env.PW_EVENTS);
const db = mongoose.connection;
//----Middleware ----
app.use(express.json());
app.use("/home", posteventrouter);
app.use("/home/", eventsrouter);
app.use("/auth/", userroutes);

//test connection status
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });
app.get("/", function (req, res, next) {
  res.send("Welcome");
});

// error handler
// /--- Server listeing -----
let server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Server listening at http://%s:%s", host, port);
});
module.exports = app;
