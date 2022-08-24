//Initialize
const { usersschema } = require("../models/users");
let errors = { email: "", password: "" };
const jwt = require("jsonwebtoken");
let minute = 1000 * 60;
let hour = minute * 60;
let day = hour * 24;
const hour_timespamp = () => {
  return Math.floor(Date.now() / 1000 + hour);
};
let jwtSecretKey = process.env.JWT_SECRET_KEY;
//timestamp?
const createToken = (id) => {
  let expirationtime = hour_timespamp() * 24;
  return jwt.sign({ id }, jwtSecretKey, {
    expiresIn: expirationtime,
  });
};
//stupid handler does not work !!!
const handleErrors = (err) => {
  //duplicate error code
  if (err.code === 11000) {
    errors.email = "This is a duplicate email address";
    return errors;
  }
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// const bcrypt = require("bcryptjs");
const multer = require("multer");

const getSingup = async (req, res) => {
  res.render("signup");
};
const getLogin = async (req, res) => {
  res.render("login");
};

const postSignup = async (req, res) => {
  let now = new Date();
  const { name, surname, email, password, image } = req.body;

  try {
    await usersschema.findOne({ email: email }).then((user) => {
      if (user) {
        res.send("User Already Exists");
      } else {
        usersschema
          .create({
            email: email,
            name: name,
            surname: surname,
            password: password,
            date: now,
            image: image,
          })
          .then((data) => res.status(201).json(data._id));
      }
    });
  } catch (err) {
    const errors = handleErrors(err);
    // console.log("errer Code is: " + err.code);
    res.status(404).json({ errors });
  }
};
const postLogin = async (req, res) => {
  const { name, surname, date, email, password, image } = req.body;
  try {
  } catch (err) {
    res.status(422).send("user not create");
  }
};
const setCookies = async (req, res) => {
  const name = "newUser";
  const value = true;
  res.cookie(name, value, { maxAge: day, httpOnly: true });
  res.status(200).send("Set cookies successfully");
};

module.exports = {
  getSingup: getSingup,
  getLogin: getLogin,
  postSignup: postSignup,
  postLogin: postLogin,
  setCookies: setCookies,
};
