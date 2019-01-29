const mongoose = require('mongoose');
const { Schema } = mongoose;

const GiphySchema = new Schema({
    title: { type: String, required: true},
    description: { type: String},
    url: { type: String, required: true},
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Giphy', GiphySchema); 