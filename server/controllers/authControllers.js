//Initialize
const { usersschema } = require("../models/users");
// const handleErrors = (obj) => {
//   let errors = { email: "", password: "" };
//   if (obj.message.includes("users validation failed")) {
//     Object.values(obj.errors).forEach(({ properties }) => {
//       // errors[properties.path] = errors.email.properties.message;
//     });
//   }
//   return errors;
// };

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
    res.status(404).send("not able to create user");
    // if (err.message.includes("users validation failed")) {
    //   res.status(404).send("includes");
    // } else {
    //   res.status(404).send(err.message);
    // }
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
