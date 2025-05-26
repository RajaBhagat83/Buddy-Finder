 const mongoose = require("mongoose");

 const url =`Mongo_UR`;
//  mongodb+srv://RajaBhagat:1Locobgmi@clusterinitial.3qwfh.mongodb.net/Title

mongoose.connect(url,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(() => console.log("Connected to db")).catch((e)=>console.log("error",e));
