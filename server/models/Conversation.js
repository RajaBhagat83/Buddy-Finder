const mongoose = require("mongoose");

const ConversationiSchema = mongoose.Schema({
  members:{
    type:Array,
    required:true,
  },
})

const Conversation = mongoose.model('Conversation',ConversationiSchema);
module.exports = Conversation;