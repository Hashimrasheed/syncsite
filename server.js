const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const { USER_NAME, PASSWORD } = require('./config')
const markList = require('./routes/markList')
const PORT = process.env.PORT || 3000

const app = express();

//database connection
const url = 'mongodb://localhost:27017/MarkList';
// `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.wysex.mongodb.net/HalfwayTest?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...');
})

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routing
app.use('/', markList);

//port listening
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

module.exports = app