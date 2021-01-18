const express = require('express')
const app = express.Router()
const studentController = require('../app/http/controllers/studentController')
const teacherController = require('../app/http/controllers/teacherController')
const {verifyToken} = require('../app/http/middlewares/jwtVerify')

//get requests
app.get('/', studentController().homePage)

//post requests
app.post('/addStudent',verifyToken, teacherController().addStudent)
app.post('/teacherLogin', teacherController().teacherLogin)

//put requests
app.put('/editStudent/:regNum',verifyToken, teacherController().editStudent)

// delete requests
app.delete('/deletestudent/:regNum',verifyToken, teacherController().deleteStudent)



module.exports = app