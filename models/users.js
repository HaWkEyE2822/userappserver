const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
    username: String,
    address: String,
    contact: Number,
    email: String
});

module.exports = mongoose.model('users', user);
