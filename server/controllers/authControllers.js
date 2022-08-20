//Initialize
const User = require("../models/users");
// const bcrypt = require("bcryptjs");
const multer = require("multer");

const getSingup = async (req, res) => {
  res.send("signup");
};
const getLogin = async (req, res) => {
  res.send("login");
};

const postSignup = async (req, res) => {
  res.send("new signup");
};
const postLogin = async (req, res) => {
  const { name, surname, date, email, password, image } = req.body;

  res.send(req.body);
};

module.exports = {
  getSingup: getSingup,
  getLogin: getLogin,
  postSignup: postSignup,
  postLogin: postLogin,
};
