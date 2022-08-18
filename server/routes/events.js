const express = require("express");
const app = express();
app.use(express.json());

const router = express.Router();
const controller = require("../controllers/events");
// router.get("/:events", controller.getEvents);
const filter = {};
router.post("/events", controller.postEvents);
router.get("/events", async function (req, res,filter) {
    controller.getEvents(filter);

});
// router.get("/:events:", controller.getEvents);

module.exports = router;
