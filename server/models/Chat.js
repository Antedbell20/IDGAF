const mongoose = require('mongoose');
const {Schema} = mongoose;
const chatSchema = new Schema({
    chatName: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    chatMessages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'chatMessages'
        }
    ]
});
const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;