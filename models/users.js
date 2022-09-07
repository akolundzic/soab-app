const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
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
    // address: {
    //   street: { type: String, trim: true },
    //   number: { type: Number },
    //   district: { type: String, trim: true },
    // },
    image: Buffer,
  },

  { collection: "users" }
);
usersSchema.post("save", function (doc, next) {
  next();
});
usersSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//fire a functin when ever new document is save to database
const usersschema = mongoose.model("users", usersSchema);
module.exports = { usersschema };