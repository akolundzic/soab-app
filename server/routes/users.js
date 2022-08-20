const express = require("express");
const app = express();
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
router.get("/signup/", async (req, res) => {
  await contr.getSingup(req, res);
});
router.post("/signup/", async (req, res) => {
  await contr.postSignup(req, res);
});
module.exports = router;
