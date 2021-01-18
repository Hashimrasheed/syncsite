const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Restaurant schema
const studentSchema = new Schema({
    Name: {type: String, required: true},
    Register_Number: {type: Number, required: true},
    Maths: {type: Number, required: true},
    Science: {type: Number, required: true},
    English: {type: Number, required: true},
    Total: {type: Number, required: true},
})

module.exports = mongoose.model('Student', studentSchema)