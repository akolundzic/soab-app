const express = require("express");
const { verifyToken, checkUser } = require("../middleware/authmiddleware");
const app = express();
let minute = 1000 * 60;
let hour = minute * 60;
let day = hour * 24;

//--middleware------
app.use(express.json());

const router = express.Router();
const contr = require("../controllers/authControllers");


/* GET users listing. */

router.post("/login",verifyToken , async (req, res) => {
  
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
router.get("/users",  checkUser,async (req, res) => {
  await contr.getUsers(req, res, {});
});
//get one user from the database - profile in react 
router.get("/users/:id",checkUser, async (req, res) => {
  const id = req.params.id;
  await contr.getOneUser(req, res, id);
});

//user authentication
router.get("/", async (req, res) => {
  await contr.getAuth(req, res);
});

module.exports = router;
