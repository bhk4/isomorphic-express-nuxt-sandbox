// models/user.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String },
    type: { type: String },
    imageUrl: { type: String },
    description: { type: String }
})

module.exports = mongoose.model('User', userSchema);