const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema(
  {
    user_id: {
      //retrieves user id from database users
      type: Number,
      required: true,
    },
    date: Date,
    location: { type: String, required: true },
    image: Buffer,
    description: { type: String, required: true },
  },

  { collection: "events" }
);
const eventsschema = mongoose.model("events", eventsSchema);
module.exports = { eventsschema };
