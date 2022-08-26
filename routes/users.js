const express = require("express");
const app = express();
let minute = 1000 * 60;
let hour = minute * 60;
let day = hour * 24;

//--middleware------
app.use(express.json());

const router = express.Router();
const contr = require("../controllers/authControllers");
/* GET users listing. */

router.get("/login", async (req, res) => {
  await contr.getLogin(req, res);
});
router.post("/login", async (req, res) => {
  await contr.postLogin(req, res);
});
router.get("/signup", async (req, res) => {
  // await contr.getSingup(req, res);
  res.render("signup");
});
router.post("/signup/", async (req, res) => {
  await contr.postSignup(req, res);
});
//--cookies user identifier
router.get("/set-cookies/", contr.setCookies);
router.get("/get-cookies/", async (req, res) => {
  const cookies = req.cookies;
  try {
    res.status(200).send(await cookies.newUser);
  } catch (e) {
    res.status(404).send("Cookie not found, undefined :${cookie}" + e.message);
  }
});
//user authentication
router.get("/", async (req, res) => {
  await contr.getAuth(req, res);
});

module.exports = router;
