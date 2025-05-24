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
  },

},
{timestamps:true}
)

const Messages = mongoose.model('Message',MessageSchema);
module.exports = Messages;