//Initialize
const { usersschema } = require("../models/users");
let errors = { email: "", password: "" };

const handleErrors = (err) => {
  // console.log("in catch statement " + err.code);
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
  res.send("login");
};

const postSignup = async (req, res) => {
  let now = new Date();
  const { name, surname, date, email, password, image } = req.body;
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
          .then((data) => res.status(201).json(data));
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

module.exports = {
  getSingup: getSingup,
  getLogin: getLogin,
  postSignup: postSignup,
  postLogin: postLogin,
};
