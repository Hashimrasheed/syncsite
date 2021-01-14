const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const {USER_NAME, PASSWORD} = require('./config')
const restaurants = require('./routes/restaurants')
const PORT = process.env.PORT || 3000

const app = express();
app.use(express.static('public'))
//database connection
const url = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.wysex.mongodb.net/HalfwayTest?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...');
})

//view engine setup
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routing
app.use('/', restaurants);

//port listening
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})