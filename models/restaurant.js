const mongoose = require('mongoose');

// MONGOOSE SCHEMA SETUP
// creating schema:
const restSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
// creating restaurant model based on our schema allowing us to use methods and exporting it to use in other files:
module.exports = mongoose.model('Restaurant', restSchema);