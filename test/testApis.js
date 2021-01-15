let chai = require('chai')
let chaiHttp = require('chai-http')
let mongoose = require('mongoose')
let server = require('../server')
const { USER_NAME, PASSWORD } = require('../config')
const restaurants = require('../app/http/controllers/restaurants')

//Assertion style
chai.should();

chai.use(chaiHttp)


describe('Restaurant API', () => {

    //Test the route to get all restaurants
    describe("GET /restaurants?:limit", () => {
        it("It will get all the restaurants", (done) => {
            chai.request(server)
                .get('/restaurants?:limit')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })
        })
    })

    //Test the route toget a restaurant by Id
    describe("GET /restaurant/:id", () => {
        it("It will get a restaurants details", (done) => {
            const ResId = '6000ad29038d874c1db246a6'
            chai.request(server)
                .get('/restaurant/' + ResId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })
        })
    })

    //Test POST api to create a restaurant
    describe("POST /restaurant", () => {
        it("It will POST a new restaurants", (done) => {
            const restaurant = {
                Name: "Club sulaimani",
                Location: "Kozhikode",
                cuisine: "italian",
                grade: 5
            }
            chai.request(server)
                .post('/restaurant')
                .send(restaurant)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })
    })

    //Test PUT api to update Restaurant address
    describe("PUT /restaurant", () => {
        it("It will PUT (update) a existing restaurants address", (done) => {
            const newAddress = {
                Location: "calicut"
            }
            const ResId = '6000ad29038d874c1db246a6'
            chai.request(server)
                .put('/restaurant/' + ResId)
                .send(newAddress)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })
    })

    //Test DELETE api to delete Restaurant
    describe("DELETE /restaurant", () => {
        it("It will DELETE a restaurant from database", (done) => {
            const newAddress = {
                Location: "calicut"
            }
            const ResId = '6000ad29038d874c1db246a6'
            chai.request(server)
                .delete('/restaurant/' + ResId)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })
    })

    // Get a Restaurant grade
    describe("GET /getrestaurantgrade/:id", () => {
        it("It will get a restaurant Grade", (done) => {
            const ResId = '6000ad29038d874c1db246a6'
            chai.request(server)
                .get('/getrestaurantgrade/:id')
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })
    })

    // Get all cuisines in database
    describe("GET /restaurants/cuisines", () => {
        it("It will get all cuisines", (done) => {
            chai.request(server)
                .get('/restaurants/cuisines')
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })
    })

    //Get restaurants under a cuisine
    describe("GET /restaurants/cuisine/?:cuisine", () => {
        it("It will get all cuisines", (done) => {
            const cuisine = 'italian'
            chai.request(server)
                .get('/restaurants/cuisine/?cuisine=' + cuisine)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })
    })
})
