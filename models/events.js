const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema(
  {
    date: { type: Date, required: true },
    time: {
      type: String,
      required: [true, "Please type in a location "],
    },

    venueName: {
      type: String,
      required: [true, "Please provide a venue name"],
    },
    address: {
      street: { type: String, trim: true },
      number: { type: Number },
      district: { type: String, trim: true },
    },
    eventName: {
      type: String,
      required: [true, "Please provide a event name"],
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
