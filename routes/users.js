const express = require("express");
const { verifyToken, checkUser } = require("../middleware/authmiddleware");
// const { usersschema } = require("../models/users");
// const mongoose = require('mongoose');
const app = express();
let minute = 1000 * 60;
let hour = minute * 60;
let day = hour * 24;

//--middleware------
app.use(express.json());
const router = express.Router();
const contr = require("../controllers/authControllers");
process.on("warning", (e) => console.warn(e.stack));
/* GET users listing. */
router.post("/login", verifyToken, async (req, res) => {
  await contr.postLogin(req, res);
});
router.get("/logout", async (req, res, next) => {
  await contr.getLogout(req, res);
});
// router.get("/signup", async (req, res) => {
//   await contr.getSingup(req, res);
//   // res.render("signup");
// });
router.post("/signup/", async (req, res) => {
  await contr.postSignup(req, res);
});
//get all users from the database
router.get("/users", async (req, res) => {
  await contr.getUsers(req, res, {});
});
//get one user from the database - profile in react
router.get("/users/:id",  async (req, res) => {
  const id = req.params.id;
  await contr.getOneUser(req, res, id);
  // await contr.getOneUser(req, res, id);
});

//update user
router.put("/users/:id", async (req, res) => {
  await contr.updateUser(req, res);
});

//user authentication
// router.get("/", async (req, res) => {
//   await contr.getAuth(req, res);
// });

module.exports = router;
