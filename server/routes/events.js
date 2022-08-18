const express = require("express");
const app = express();
app.use(express.json());

const router = express.Router();
const controller = require("../controllers/events");
// router.get("/:events", controller.getEvents);

router.post("/events", controller.postEvents);
router.get("/events", async (req, res) => {
  controller.getEvents(req, res);
});
router.get("/events/:district", async (req, res) => {
  const district = req.params.district;
  await controller.getEvents(req, res, { "address.district": district });
});
router.delete("/events/:id", async (req, res) => {
  const id = req.params.id;
  await controller.removeEvent(req, res, { id: id });
});
router.put("/events/:id", async (req, res) => {
  const id = req.params.id;
  await controller.updateEvent(req, res, { id: id });
});

module.exports = router;
