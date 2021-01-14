const { set } = require('mongoose')
const Restaurant = require('../../app/models/restaurant')


function getRestaurants(limit) {
    return Restaurant.aggregate([
        {
            $limit: limit
        }
    ])
}

function getARestaurant(id) {
    return Restaurant.findOne({_id: id})
}

function checkRestaurantExist(name) {
    return Restaurant.findOne({name}) || null
}

function createRestaurant(restaurant) {
    let res = {
        name: restaurant.Name,
        location: restaurant.Location,
        cuisine: restaurant.cuisine,
        grade: restaurant.grade,
    }
    return Restaurant.insertMany(res)
}

function updateRestaurant(id, address) {
    return Restaurant.updateOne({_id: id}, {location: address})
}

function deleteRestaurant(id) {
    return Restaurant.deleteOne({_id: id})
}

function getrestaurantgrade(id) {
    return Restaurant.findById(id)
}

function getrestaurantCuisines() {
    return Restaurant.aggregate([
        {
            $group: {_id: "$cuisine"}
        }
    ])
}

function restaurantsInCuisines(cuisine) {
    return Restaurant.aggregate([
        {
            $match: {cuisine: cuisine}
        },
        {
            $project: {name: 1, _id: 0}
        }
    ])
}


module.exports = {
    getRestaurants,
    getARestaurant,
    createRestaurant,
    updateRestaurant,
    checkRestaurantExist,
    deleteRestaurant,
    getrestaurantgrade,
    getrestaurantCuisines,
    restaurantsInCuisines
}
