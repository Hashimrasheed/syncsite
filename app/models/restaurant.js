const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    cuisine: {type: String, required: true},
    grade: {type: Number, required: true},
})

module.exports = mongoose.model('Restaurants', restaurantSchema)