//Initialize
const { usersschema } = require("../models/users");

// const bcrypt = require("bcryptjs");
const multer = require("multer");

const getSingup = async (req, res) => {
  res.send("signup");
};
const getLogin = async (req, res) => {
  res.send("login");
};

const postSignup = async (req, res) => {
  let now = new Date();
  const { name, surname, date, email, password, image } = req.body;
  try {
    await usersschema.findOne({ email: email }).then((doc) => {
      if (doc) {
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
          .then((data) => {
            res.status(201).json(data);
          });
      }
    });
  } catch (err) {
    res.status(422).send(err.message);
  }
};
const postLogin = async (req, res) => {
  const { name, surname, date, email, password, image } = req.body;
  try {
  } catch (err) {}
  res.status(422).send(err.message);
};

module.exports = {
  getSingup: getSingup,
  getLogin: getLogin,
  postSignup: postSignup,
  postLogin: postLogin,
};
