//Initialize
const { usersschema } = require("../models/users");
const handleErrors = (obj) => {
  let error = { email: "", password: "" };
  if (obj.message.includes("users validation failed")) {
    Object.values(obj.errors).forEach((error) => {
      console.log("inside error function : ");
    });
  }
  return error;
};

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
    // if (doc) {
    //   res.send("User Already Exists");
    // } else {
    await usersschema.findOne({ email: email }, function (user) {
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
          .then((data) => {
            res.status(201).json(data);
          });
        //end if else statement
      }
      //end function of finde one
    });
  } catch (err) {
    console.log("catch block  " + handleErrors(err));

    res.status(404).send("user was not created");
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
