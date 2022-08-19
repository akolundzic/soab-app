const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String },
    date: Date ,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: Buffer,
  },

  { collection: "users" }
);
const usersschema = mongoose.model("users", usersSchema);
module.exports = { usersschema };
