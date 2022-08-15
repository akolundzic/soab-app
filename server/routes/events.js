const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
const router = express.Router();

const controller = require("../controllers/events");
router.get("/:events", controller.getEvents);
router.post("/:events", controller.postEvents);
// router.get("/location", test);
// router.get("/date", test);
module.exports = router;
