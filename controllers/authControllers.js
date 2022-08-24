//Initial
const { usersschema } = require("../models/users");
let errors = { email: "", password: "" };
const jwt = require("jsonwebtoken");
//cookie time
let day = 60 * 60 * 24;
const multi = 6;
const expire = day * multi;
// const hour_timestamp = () => {
//   return Math.floor(Date.now() / 1000 + hour);
// };
let jwtSecretKey = process.env.JWT_SECRET_KEY;

const createToken = (id) => {
  return jwt.sign({ id }, jwtSecretKey, {
    expiresIn: expire,
  });
};
const setCookies = async (req, res) => {
  const name = "newUser";
  const value = true;
  const expire_cookie = expire * 1000; //

  res.cookie(name, value, { maxAge: expire_cookie, httpOnly: true });
  res.status(200).send("Set cookies successfully");
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
    await usersschema.findOne({ email: email }).then(async (user) => {
      if (user) {
        res.send("Use Already Exists");
      } else {
        const user = await usersschema.create({
          email: email,
          name: name,
          surname: surname,
          password: password,
          date: now,
          image: image,
        });
        // const token = createToken(user._id);
        // res.cookie("user_cookie", token, {
        //   httpOnly: true,
        //   maxAge: expire_cookie,
        // });
        res.status(201).json(user._id);

        // .then((data) => res.status(201).json({userid:data._id}));
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
  setCookies: setCookies,
};
