const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: {
       type: String, 
       required: [true,"Bitte gib deinen Nachnamen ein."] },
    date: { type: Date },
    email: {
      type: String,
      required: true, 
      unique: true,
      lowercase: true,
      validate: [isEmail, "Bitte gib eine valide Email-Adresse ein."],
    },
    password: {
      type: String,
      required: [true, "Bitte gib eine Passwort ein."],
      minlength: [6, "Minium Passwortlänge sind 6 Characters."],
    },
    // address: {
    //   street: { type: String, trim: true },
    //   number: { type: Number },
    //   district: { type: String, trim: true },
    // },
    token:{
      type:String
  },
    image: Buffer,
  },

  { collection: "users" }
);

usersSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// usersSchema.post("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
//fire a functin when ever new document is save to database
const usersschema = mongoose.model("users", usersSchema);
module.exports = { usersschema };