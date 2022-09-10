//Initial
const bcrypt = require("bcryptjs");
const { usersschema } = require("../models/users");
let errors = { email: "", password: "" };
const jwt = require("jsonwebtoken");
require("dotenv").config();
//cookie time
const maxAge = 5 * 24 * 60 * 60;
// const hour_timestamp = () => {
//   return Math.floor(Date.now() / 1000 + hour);
// };
let jwtSecretKey = process.env.JWT_SECRET_KEY;

const createToken = (id) => {
  return jwt.sign({ id }, jwtSecretKey, {
    expiresIn: maxAge,
  });
};

// var cookie = req.cookies.cookieName;
// const cookie =req.cookies.cookieName;
//   if (cookie === undefined) {
//     // no: set a new cookie

//     var randomNumber=Math.random().toString();
//     randomNumber=randomNumber.substring(2,randomNumber.length);
//     res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
//     console.log('cookie created successfully');
//   } else {
//     // yes, cookie was already present
//     console.log('cookie exists', cookie);
//   }
//   next(); // <-- important!

const setCookies = async (req, res, next) => {
  const name = "user-cookie";
  const value = true;
  const expire_cookie = maxAge * 1000; //

  res.cookie(name, value, { maxAge: expire_cookie, httpOnly: false });
  res.status(200).send("Set cookies successfully" + jwtSecretKey);
  next();
};

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

const multer = require("multer");

const getSingup = async (req, res) => {
  res.render("signup");
};
const getLogin = async (req, res) => {
  res.render("login");
};

const postSignup = async (req, res) => {
  let now = new Date();
  const { name, surname, email, password, image, adress } = req.body;
  try {
    console.log(req.body);
    await usersschema.findOne({ email: email }).then(async (user) => {
      if (user) {
        res.send("Useremail  already exists");
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
        res.cookie("usercookie", token, {
          httpOnly: false,
          maxAge: maxAge * 1000,
        });
        res.status(201).json({ user_id: user._id });
      }
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};
const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //exec
    await usersschema.findOne({ email: email }).then((user) => {
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      //check if cookie exists eq. is defined
      const cookie = req.cookies.cookieName;
      if (cookie === undefined) {
        // no: set a new cookie
        setCookies();
        console.log("cookie created successfully");
      } else {
        // yes, cookie was already present
        console.log("cookie exists", cookie);
      }
      //   next(); // <-- important!
      //if hashed password is ok,
      //then server creates a jwt cookie to the browser client back
      if (!passwordIsValid) {
        console.log("Authentication unsuccessful: invalid password");
        res.status(401).json({ error: "Invalid password" });
      } else {
        console.log("Authentication successful");
        const token = createToken(user._id);
        res.status(200).json({
          id: user._id,
          email: user.email,
          accessToken: token,
        });
      }
    });
  } catch (err) {
    // res.status(422).send("user does not exist", err);
    const errors = handleErrors(err);
    res.status(404).json({ errors: "User does not exist" });
  }
};
//authentification of user's token
const getAuth = async (req, res, err) => {
  try {
    const token = req.body.token;
    if (token) {
      const decode = await jwt.verify(token, jwtSecretKey);
      //response with decoded token
      return await res.status(200).json({
        login: true,
        data: decode,
      });
    } else {
      errors = handleErrors(err);
      return res.status(404).json({ errors: "No Token provided" });
    }
  } catch (err) {
    errors = handleErrors(err);
    res.status(401).json({ errors: "Login failure" });
  }
};
const postLogout = async function (req, res, next) {
  res.clearCookie("jwt");
  res.redirect("/");
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
  getSingup: getSingup,
  getLogin: getLogin,
  postSignup: postSignup,
  postLogin: postLogin,
  setCookies: setCookies,
  getAuth: getAuth,
  postLogout: postLogout,
  getUsers: getUsers,
  getOneUser: getOneUser,
};
