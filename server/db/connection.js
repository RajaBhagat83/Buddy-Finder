 const mongoose = require("mongoose");

 const url =`Mongo_UR`;


mongoose.connect(url,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(() => console.log("Connected to db")).catch((e)=>console.log("error",e));
