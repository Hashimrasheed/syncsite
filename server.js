const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const path = require('path')
const { USER_NAME, PASSWORD, PORTNum } = require('./config')
const markList = require('./routes/markList')
const PORT = PORTNum || 3000

const app = express();

//database connection
const url = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.wysex.mongodb.net/syncsite?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...');
})

//set static file
app.use(express.static(path.join(__dirname, 'docs')))

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routing
app.use('/', markList);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "docs/index.html"))
})

//port listening
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

module.exports = app