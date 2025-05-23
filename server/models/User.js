const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  interest :{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  token:{
    type:String
  }
})

const User = mongoose.model('User',userSchema);
module.exports = User;