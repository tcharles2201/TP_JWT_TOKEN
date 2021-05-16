const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Comment = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    id_post: {
        type: String
    }
});

module.exports = mongoose.model('Comment', Comment);