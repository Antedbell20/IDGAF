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
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiver:{
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    }
  },
  { timestamps: true, }
);

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;