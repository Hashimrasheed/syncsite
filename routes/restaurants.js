const express = require('express')
const app = express.Router()
const restaurants = require('../app/http/controllers/restaurants')
const gradeAndCuisineController = require('../app/http/controllers/gradeAndCuisineController')

app.get('/?:limit', restaurants().getRestaurants)
app.get('/restaurants?:limit', restaurants().getRestaurants)
app.get('/restaurant/:id', restaurants().getARestaurant)
app.get('/getrestaurantgrade/:id', gradeAndCuisineController().getrestaurantgrade)
app.get('/restaurants/cuisines', gradeAndCuisineController().cuisines)
app.get('/restaurants/cuisine?:cuisine', gradeAndCuisineController().restaurantsInCuisines)

app.post('/restaurant', restaurants().createRestaurant)

app.put('/restaurant/:id', restaurants().updateRestaurant)

app.delete('/restaurant/:id', restaurants().deleteRestaurant)



module.exports = app