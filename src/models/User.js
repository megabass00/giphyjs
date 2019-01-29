const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    mastername: { type: String, required: true},
    email: { type: String},
    avatar: { type: String, required: true},
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema); 