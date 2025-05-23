const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  ConversationId:{
    type:String,
  },
  senderId:{
    type:String
  },
  message:{
    type:String
  }

})

const Messages = mongoose.model('Message',MessageSchema);
module.exports = Messages;