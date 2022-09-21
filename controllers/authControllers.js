//Initial
const bcrypt = require("bcryptjs");
const { usersschema } = require("../models/users");
let errors = { email: "", password: "" };
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { handleErrors } = require("../middleware/authmiddleware");
// const http = require("http");
// const url = require("url");
// const multer = require("multer");
// const { response } = require("express");
//cookie time
const maxAge = 24 * 60 * 60;
// const hour_timestamp = () => {
//   return Math.floor(Date.now() / 1000 + hour);
// };
let jwtSecretKey = process.env.JWT_SECRET_KEY;

const createToken = (id) => {
  return jwt.sign({ id }, jwtSecretKey, {
    expiresIn: maxAge,
  });
};
//Save jwt Token in a Cookie
const tokensaveCookies = (res, token, time) => {
  const name = "usercookie";
  return res.cookie(name, token, {
    httpOnly: false,
    maxAge: time,
    path: "/",
  });
};

// const handleErrors = (err) => {
//   //duplicate error code
//   if (err.code === 11000) {
//     errors.email = "This is a duplicate email address";
//     return errors;
//   }
//   if (err.message.includes("users validation failed")) {
//     Object.values(err.errors).forEach(({ properties }) => {
//       errors[properties.path] = properties.message;
//     });
//   }
//   return errors;
// };

const getSingup = async (req, res) => {
  res.render("signup");
};
// middleware functions for post get login, signup etc.
const postSignup = async (req, res) => {
  let now = new Date();
  const expire_cookie = maxAge * 1000;
  const { name, surname, email, password, image, adress } = req.body;
  try {
    await usersschema.findOne({ email: email }).then(async (user) => {
      if (user) {
        res.json({ message: "Useremail  already exists" });
      } else {
        const user = await usersschema.create({
          email: email,
          name: name,
          surname: surname,
          password: password,
          date: now,
          image: image,
          // address:{
          //   "street":address.street,
          //   "numbers":address.number,
          //   "district":address.district,
          // }
        });

        const token = createToken(user._id);
        res
          .tokensaveCookies(res, token, expire_cookie)
          .status(201)
          .json({ user_id: user._id, accessToken: token });
      }
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};
//Login
const postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await usersschema.findOne({ email: email }).then((user) => {
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      const expire_cookie = maxAge * 1000; //
      if (!passwordIsValid) {
        res.status(401).json({ error: "Invalid password" });
      } else {
        const token = createToken(user._id);
        tokensaveCookies(res, token, expire_cookie).status(200).json({
          id: user._id,
          email: user.email,
          accessToken: token,
        });
      }
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors: "User does not exist" });
  }
};
//get logout
const getLogout = async (req, res) => {
  //remove token value
  key = Object.keys(req.cookies);

  try {
    await res
      .clearCookie(`${key[0]}`, { path: "/" })
      .status(200)
      .json({ message: "Successfully logged out" });
  } catch (err) {
    errors = handleErrors(err);
    await res.status(401).json({ errors: "Logout Failed" });
  }
};

//find all users
const getUsers = async function (req, res, filter) {
  try {
    await usersschema
      .find(filter)
      .sort({ date: 1 })
      .then((response) => res.json(response));
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors: errors });
  }
};
//find one user with :id
const getOneUser = async (req, res, id) => {
  try {
    await usersschema
      .findById({ _id: id })
      // .then((data) => data.remove())
      .then((data) => {
        res.status(201).json(data);
      });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(422).json({ errors: errors });
  }
};

module.exports = {
  postSignup: postSignup,
  postLogin: postLogin,
  getLogout: getLogout,
  getUsers: getUsers,
  getOneUser: getOneUser,
};
