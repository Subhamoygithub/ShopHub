const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    profileimage:String,
    publicId:String,
      role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
})

const User = mongoose.model("User",userSchema);
module.exports = User;