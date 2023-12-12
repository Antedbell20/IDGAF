const mongoose = require('mongoose');
const {Schema} = mongoose;

const MessageSchema = mongoose.Schema(
  {
    content: {
      type: String,
    },
    attachment: {
      type: String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    }
  },
  { timestamps: true, }
);

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;