const mongoose = require('mongoose');

// Setup schema
const messageSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    timestamp: Number,
    tags: [String]
});

// Export Message model
const Message = module.exports = mongoose.model('message', messageSchema);
module.exports.get = function (callback, limit) {
    Message.find(callback).limit(limit);
}