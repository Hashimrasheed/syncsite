let chai = require('chai')
let chaiHttp = require('chai-http')
let mongoose = require('mongoose')
let server = require('../server')
// const { USER_NAME, PASSWORD } = require('../config')

//Assertion style
chai.should();

chai.use(chaiHttp)


describe('Restaurant API', () => {

    //Test the route to get all restaurants
    describe("GET all Students", () => {
        it("It will get all students", (done) => {
            chai.request(server)
                .get('/')
                .end((err, response) => {
                    response.should.have.status(200);
                    // response.body.should.be.a('array');
                    done();
                })
        })
    })

    //Test POST api for teacher login
    describe("POST /addStudent", () => {
        it("teacher login success", (done) => {
            const login = {
                Email: "teacher@gmail.com",
                Password: 1234,
            }
            chai.request(server)
                .post('/teacherlogin')
                .send(login)
                .end((err, response) => {
                    response.should.have.status(201);
                    done();
                })
        })

        it("teacher login error", (done) => {
            const login = {
                Email: "teacher@gmail.co",
                Password: 123,
            }
            chai.request(server)
                .post('/teacherlogin')
                .send(login)
                .end((err, response) => {
                    response.should.have.status(401);
                    done();
                })
        })
    })
    
    //Test POST api to create a student
    describe("POST /addStudent", () => {
        it("It will POST a new student - success", (done) => {
            const student = {
                Name: "Hashim",
                Register_Number: 17090789,
                Maths: 58,
                Science: 59,
                English: 60
            }
            chai.request(server)
                .post('/addStudent')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlYWNoZXJAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjEwOTY1MDQ4LCJleHAiOjE2MTEzMjUwNDh9.hw-sRdj2yfycV4aZBD49ULzweGEwYzlfnjd8jtDbJKA')
                .send(student)
                .end((err, response) => {
                    response.should.have.status(201);
                    done();
                })
        })

        it("It will POST a new student - Student already exist", (done) => {
            const student = {
                Name: "Hashim",
                Register_Number: 17090789,
                Maths: 58,
                Science: 59,
                English: 60
            }
            chai.request(server)
                .post('/addStudent')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlYWNoZXJAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjEwOTY1MDQ4LCJleHAiOjE2MTEzMjUwNDh9.hw-sRdj2yfycV4aZBD49ULzweGEwYzlfnjd8jtDbJKA')
                .send(student)
                .end((err, response) => {
                    response.should.have.status(409);
                    done();
                })
        })
    })

    //Test PUT api to update Restaurant address
    describe("PUT /editStudent/:regNum", () => {
        it("It will PUT (update) a existing student marks - sucess", (done) => {
            const newAddress = {
                Maths: 58,
                Science: 55,
                English: 69
            }
            const ResId = 17050789
            chai.request(server)
                .put('/editStudent/' + ResId)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlYWNoZXJAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjEwOTY1MDQ4LCJleHAiOjE2MTEzMjUwNDh9.hw-sRdj2yfycV4aZBD49ULzweGEwYzlfnjd8jtDbJKA')
                .send(newAddress)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })

        it("It will PUT (update) a existing student details - invalid credentials", (done) => {
            const newAddress = {
                Name: 'Hashim',
                Maths: 58,
                Science: 55,
                English: 69
            }
            const ResId = 17050789
            chai.request(server)
                .put('/editStudent/' + ResId)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlYWNoZXJAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjEwOTY1MDQ4LCJleHAiOjE2MTEzMjUwNDh9.hw-sRdj2yfycV4aZBD49ULzweGEwYzlfnjd8jtDbJKA')
                .send(newAddress)
                .end((err, response) => {
                    response.should.have.status(401);
                    done();
                })
        })

        it("It will PUT (update) a existing student marks - student not exist", (done) => {
            const newAddress = {
                Maths: 58,
                Science: 55,
                English: 69
            }
            const ResId = 1705078
            chai.request(server)
                .put('/editStudent/' + ResId)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlYWNoZXJAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjEwOTY1MDQ4LCJleHAiOjE2MTEzMjUwNDh9.hw-sRdj2yfycV4aZBD49ULzweGEwYzlfnjd8jtDbJKA')
                .send(newAddress)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
    })

    //Test DELETE api to delete a student
    describe("DELETE /deletestudent/id", () => {
        it("It will DELETE a student from database - sucess", (done) => {
            const newAddress = {
                Location: "calicut"
            }
            const ResId = 17090789
            chai.request(server)
                .delete('/deletestudent/' + ResId)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlYWNoZXJAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjEwOTY1MDQ4LCJleHAiOjE2MTEzMjUwNDh9.hw-sRdj2yfycV4aZBD49ULzweGEwYzlfnjd8jtDbJKA')
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })

        it("It will DELETE a student from database - not exist", (done) => {
            const newAddress = {
                Location: "calicut"
            }
            const ResId = 1709078
            chai.request(server)
                .delete('/deletestudent/' + ResId)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InRlYWNoZXJAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjEwOTY1MDQ4LCJleHAiOjE2MTEzMjUwNDh9.hw-sRdj2yfycV4aZBD49ULzweGEwYzlfnjd8jtDbJKA')
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
    })

})
