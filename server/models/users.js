const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String },
    date: { type: Date },
    email: {
      type: String,
      required: [true, "Please enter a valid email address"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please provide valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minum password length is 6 characters"],
    },
    image: Buffer,
  },

  { collection: "users" }
);
const usersschema = mongoose.model("users", usersSchema);
module.exports = { usersschema };
