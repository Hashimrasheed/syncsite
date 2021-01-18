const express = require('express')
const app = express.Router()
const studentController = require('../app/http/controllers/studentController')
const teacherController = require('../app/http/controllers/teacherController')
const { verifyToken } = require('../app/http/middlewares/jwtVerify')

//get requests

/**
 * @api {get} /students get students details
 * @apiName GetStudents
 * @apiGroup Students
 * 
 * @apiSuccess (200) {object[]} All Student Details .
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "data":[
 *      {
 *           "_id": "60053c9f02c82058657eb4ff",
 *           "Name": "Hashim",
 *           "Register_Number": 17050789,
 *           "Maths": 58,
 *           "Science": 55,
 *           "English": 69,
 *           "Total": 182,
 *       },
 *      ]
 *      }
 */
app.get('/students', studentController().homePage)

//post requests

/**
 * @api {post} /teacherlogin
 * @apiName Teacher login
 * @apiGroup Teacher
 * @apiParam {String} [Email] email of Teacher to login (teacher@gmail.com).
 * @apiParam {String} [Password] password of teacher to login (1234).
 *
 * @apiSuccess (201) {String} message TUTOR LOGGED SUCCESSFULLY.
 * @apiSuccess (201) {String} token TOKEN.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created new student
 *    {
 *      "auth": "success",
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlYWNoZXJAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjEwOTgzMDk1LCJleHAiOjE2MTEzNDMwOTV9._dAqRMGHPNy3EZPrNcfuDNSFNLQ0oij8ZcOZvm185XE"
 *    }
 *
 * @apiError incorrect email or password.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "auth": "failed"
 *      }
 */
app.post('/teacherlogin', teacherController().teacherLogin)

/**
 * @api {post} /addstudent
 * @apiName Add student details
 * @apiGroup Teacher
 * 
 * @apiHeader {String} [Authorization] Jwt Token for Authorization
 * @apiParam {String} [Name] Name of student.
 * @apiParam {String} [Register_Number] Register number of student.
 * @apiParam {String} [Maths] score for Maths .
 * @apiParam {String} [Science] score for Science.
 * @apiParam {String} [English] score for English.
 *
 * @apiSuccess (201) {string} Student added.
 * @apiSuccess (201) {object} Student data.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *    {
 *      "result": "Student Added",
 *      "data": {
 *       "_id": "6005ab2ee61ea1ddad61a3f4",
 *       "Name": "Hashim",
 *       "Register_Number": 17060789,
 *       "Maths": 58,
 *       "Science": 59,
 *       "English": 60,
 *       "Total": 177,
 *       }
 *    }
 *
 * @apiError Student already exist.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 409 OK
 *    {
 *      "result": "Student already exist",
 *      "data": {
 *       "_id": "6005ab2ee61ea1ddad61a3f4",
 *       "Name": "Hashim",
 *       "Register_Number": 17060789,
 *       "Maths": 58,
 *       "Science": 59,
 *       "English": 60,
 *       "Total": 177,
 *       }
 *    }
 */
app.post('/addStudent', verifyToken, teacherController().addStudent)

//put requests

/**
 * @api {put} /editStudent/:regNum
 * @apiName Edit student details
 * @apiGroup Teacher
 * 
 * @apiHeader {String} Authorization JwtToken
 * 
 * @apiParam {String} regNum Register number of student.
 * @apiParam {String} [Maths] score for Maths .
 * @apiParam {String} [Science] score for Science.
 * @apiParam {String} [English] score for English.
 *
 * @apiSuccess (200) {String} Student details edited.
 * @apiSuccess (200) {Object} updated list of student details.
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "result": "Student details edited",
 *   "data": {
 *       "subjectOne": 54,
 *       "subjectTwo": 78,
 *       "subjectThree": 87,
 *       "_id": "6003546c17aadfeba3cc8f06",
 *       "name": "fsg",
 *       "reg_No": null,
 *       "total": 534,
 *       }
 *   }
 * 
 * @apiError Student not exist.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 OK
 *    {
 *      "result": "Student not exist",
 *    }
 */
app.put('/editStudent/:regNum', verifyToken, teacherController().editStudent)

// delete requests

/**
 * @api {delete} /deletestudent/:regNum 
 * @apiName Delete student details
 * @apiGroup Teacher
 * 
 * @apiHeader {String} Authorization JwtToken
 * 
 * @apiParam {String} regNum Register number of student.
 * 
 * @apiSuccess (200) {String} Student details deleted.
 * @apiSuccess (200) {Object} updated list of student details.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "result": "Student details deleted",
 *   "data": {
 *       "n": 1,
 *       "ok": 1,
 *       "deletedCount": 1
 *       }
 *   }
 *
 * 
 * @apiError Student not exist.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 404 OK
 *    {
 *      "result": "Student not exist",
 *    }
 */
app.delete('/deletestudent/:regNum', verifyToken, teacherController().deleteStudent)


module.exports = app