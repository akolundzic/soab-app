const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    
    venueName: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      street: { type: String, trim: true },
      number: { type: Number },
      district: { type: String, trim: true },
    },
    eventName: {
      type: String,
      trim: true,
    },
    description: { type: String, trim: true },
    //url string - later on multer
    image: String,
  },
  { collection: "events" }
);
const eventsschema = mongoose.model("events", eventsSchema);
module.exports = { eventsschema };
