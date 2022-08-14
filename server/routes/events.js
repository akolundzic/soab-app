const express = require("express");
const app = express();
app.use(express.json());
// const controller = require("../controllers/events");
router.get("/events", (req, res) => {
  res.send("test");
});
// router.get("/location", controller.getEvents);
// router.get("/date", controller.getEvents);
module.exports = router;
