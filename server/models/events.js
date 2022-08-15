const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema(
  {
    user: {
      //retrieves user id from database users
      id: Number,
      name: String,
    },
    date: Date,
    location: String,
    time: String,
    image: String,
    description: String,
  },

  { collection: "events" }
);
const eventsschema = mongoose.model("events", eventsSchema);
module.exports = { eventsschema };
