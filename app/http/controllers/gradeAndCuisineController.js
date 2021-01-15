const {
    getrestaurantgrade,
    getrestaurantCuisines,
    restaurantsInCuisines
} = require('../../../libs/commonDb/dbFunctions')

function restaurants() {
    return {
        //get Restaurant grade
        async getrestaurantgrade(req, res) {
            const id = req.params.id
            try {
                const restaurant = await getrestaurantgrade(id)
                console.log(restaurant);
                if (restaurant) {
                    res.json({ restaurantGrade: restaurant.grade + '/' + 5 })
                } else {
                    res.json({ status: "Restaurant not exist" })
                }
            } catch (e) {
                res.json({ status: "Something went wrong" })
            }
        },
        //get All unique restaurant cuisines
        async cuisines(req, res) {
            try {
                const cuisines = await getrestaurantCuisines()
                let cuisineArray = []
                for (let i in cuisines) {
                    cuisineArray = [...cuisineArray, cuisines[i]._id]
                }
                if (cuisineArray.length !== 0) {
                    res.json({ cuisineArray })
                } else {
                    res.json({ status: "No cuisines" })
                }
            } catch (e) {
                res.json({ status: 'Something went wrong', Error: e })
            }
        },
        // Get all restaurants under a cuisine
        async restaurantsInCuisines(req, res) {
            try {
                const cuisine = req.query.cuisine
                const restaurants = await restaurantsInCuisines(cuisine)
                let restaurantArray = []
                for (let i in restaurants) {
                    restaurantArray = [...restaurantArray, restaurants[i].name]
                }
                if (restaurantArray.length !== 0) {
                    res.json({ restaurantArray })
                } else {
                    res.json({ status: "No Restaurant in this cuisine" })
                }
            } catch (e) {
                res.json({ status: 'Something went wrong', Error: e })
            }
        }
    }
}

module.exports = restaurants