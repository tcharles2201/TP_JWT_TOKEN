const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Post = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', Post);