//Initial
const bcrypt = require("bcryptjs");
const { usersschema } = require("../models/users");
let errors = { email: "", password: "" };
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { handleErrors } = require("../middleware/authmiddleware");
const { restart } = require("nodemon");
const mongoose = require("mongoose");

// const { response } = require("../app");
// const http = require("http");
// const url = require("url");
// const multer = require("multer");
// const { response } = require("express");
//cookie time
const maxAge = 24 * 60 * 60;
const expire_cookie = maxAge * 1000;
// const hour_timestamp = () => {
//   return Math.floor(Date.now() / 1000 + hour);
// };
let jwtSecretKey = process.env.JWT_SECRET_KEY;
const message = {
  login: false,
  message: "",
};

const createToken = (id) => {
  return jwt.sign({ id }, jwtSecretKey, {
    expiresIn: maxAge,
  });
};
//Save jwt Token in a Cookie
const tokensaveCookies = (res, token) => {
  const name = "usercookie";
  return res.cookie(name, token, {
    httpOnly: false,
    maxAge: expire_cookie,
    path: "/",
  });
};
const getSingup = async (req, res) => {
  res.render("signup");
};
// middleware functions for post get login, signup etc.
const postSignup = async (req, res) => {
  let now = new Date();

  const { name, surname, email, password, image } = req.body;
  try {
    const exist = await usersschema.findOne({ email: email });
    // await usersschema.findOne({ email: email }).then(async (user) => {
    if (exist) {
       const errors ={};
       errors['login']=false;
       errors['email']= "Diese Email existiert schon,bitte logge dich ein.";
       res.status(400).json(errors);
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
      tokensaveCookies(res, token)
        .status(201)
        .json({ login: true, user_id: user._id, accessToken: token });
      //  //else statemen
    }
  } catch (err) {
    
    const errors = handleErrors(err);
    res.status(400).json(errors );
  }
};
//Login
const postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await usersschema.findOne({ email: email }).then((user) => {
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      const expire_cookie = maxAge * 1000; 
      // res.json(passwordIsValid);

      if (!passwordIsValid) {
        message["message"] = "Password is not valid";
        res.status(401).json(message);
      } else {
        const token = createToken(user._id);
        tokensaveCookies(res, token, expire_cookie).status(200).json({
          login: true,
          id: user._id,
          email: user.email,
          accessToken: token,
        });
      }
    });
  } catch (err) {
    message["message"] = "User does not exist";
    res.status(404).json(message);
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
    await res.status(401).json(errors);
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
    res.status(404).json(errors);
  }
};
//find one user with :id
const getOneUser = async (req, res, id) => {
  
  try {
    await usersschema
      .findById(`${id}`)
      .exec()
      .then((response) => {
        if (response) {
          res.status(200).json(response);
        } else {
          message["message"] = "You are not in the database, please sign up";
          res.status(500).json(message);
        }
      });
  } catch (err) {
    res.status(500).json({login: false, errors:err});
  }
};
//update user
const updateUser = async function (req, res) {
 
  try {
    const bodyobj = req.body;
    const data = await usersschema.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    Object.keys(data).forEach(async (k) => {
      for (const [keybody, valuebody] of Object.entries(bodyobj)) {
        if (data[k][`${keybody}`]) {
          data[k][`${keybody}`] = valuebody;
          data.save();
          message["message"] = "Successfully Saved " + `${keybody}` ,
          message['login']=true;
        } else {
          message["message"] ="Was not able to save data" ,
          message['login']=false;
        }
      }
    });
    res.status(201).json(message);
    //--------------------------------------------
    //end of try statement
  } catch (err) {
    res.status(422).json({login:false, errors:err});
  }
};

module.exports = {
  postSignup: postSignup,
  postLogin: postLogin,
  getLogout: getLogout,
  getUsers: getUsers,
  getOneUser: getOneUser,
  updateUser: updateUser,
};

//  for (const [keybody, valuebody] of Object.entries(req.body)) {
//   console.log(`${keybody}: ${valuebody}`);
// }
