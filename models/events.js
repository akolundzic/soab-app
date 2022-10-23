const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema(
  {
    // date: { type: Date, required: true },
    date: {
      type: Date,
      required: [true, "Bitte gib eine Zeit ein."],
    },

    venueName: {
      type: String,
      required: [true, "Bitte gib den Ort ein."],
    },
    address: {
      street: { type: String, trim: true },
      number: { type: Number },
      district: { type: String, trim: true },
    },
    eventName: {
      type: String,
      required: [true, "Bitte gib den Event-Namen ein."],
    },
    description: { type: String, trim: true },
    //url string - later on multer
    image: String,
  },
  { collection: "events" }
);
// eventsSchema.post("save", function (next) {
//   next();
// });
const eventsschema = mongoose.model("events", eventsSchema);
module.exports = { eventsschema };
