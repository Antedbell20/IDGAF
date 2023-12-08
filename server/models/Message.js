const mongoose = require('mongoose');
const {schema} = mongoose;
const messageSchema = new Schema({
    messageText: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    messageAuthor: [
        {
            type: Schema.Types.ObjectId,
            ref: 'messageAuthor'
        }
    ]
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;