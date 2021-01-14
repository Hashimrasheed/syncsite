// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    USER_NAME: process.env.USER_NAME,
    PASSWORD: process.env.PASSWORD,
};