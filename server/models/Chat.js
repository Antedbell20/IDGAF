const mongoose = require('mongoose');
const {Schema} = mongoose;
const chatSchema = new Schema({
    chatName: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
      isGroupChat: {
      type: Boolean,
      default: false
    },
     users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
      latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
      groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    groupPic: {
      type: String,
    },
 
}, { timestamps: true });


const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;