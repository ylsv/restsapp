const mongoose = require('mongoose');

// MONGOOSE SCHEMA SETUP
// creating schema:
const restSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    createdAt: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});
// creating restaurant model based on our schema allowing us to use methods and exporting it to use in other files:
module.exports = mongoose.model('Restaurant', restSchema);