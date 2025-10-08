 const mongoose = require("mongoose");

<<<<<<< HEAD
 const url =`mongodb+srv://Buddy-Finder:1Locobgmi@cluster0.pdkbuux.mongodb.net/`;
// cd 
=======
 const url =`Mongo_UR`;

>>>>>>> origin/main

mongoose.connect(url,{
  useNewUrlParser:true,
  useUnifiedTopology:true
<<<<<<< HEAD
}).then(() => console.log("Connected to db")).catch((e)=>console.log("error",e));
=======
}).then(() => console.log("Connected to db")).catch((e)=>console.log("error",e));
>>>>>>> origin/main
