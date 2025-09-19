 const mongoose = require("mongoose");

 const url =`mongodb+srv://Buddy-Finder:1Locobgmi@cluster0.pdkbuux.mongodb.net/`;
// cd 

mongoose.connect(url,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(() => console.log("Connected to db")).catch((e)=>console.log("error",e));