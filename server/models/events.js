const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema(
  {
    user: {
      //retrieves user id from database users
      id: Number,
      name: String,
    },
    // date: Date,
    // location: { type: String, required: true },
    // image: String,
    // description: { type: String, required: true },
  },

  { collection: "events" }
);
const eventsschema = mongoose.model("events", eventsSchema);
module.exports = { eventsschema };
