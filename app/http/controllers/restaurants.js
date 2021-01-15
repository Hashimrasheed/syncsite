const {
    getRestaurants,
    getARestaurant,
    createRestaurant,
    checkRestaurantExist,
    updateRestaurant,
    deleteRestaurant
} = require('../../../libs/commonDb/dbFunctions')

function restaurants() {
    return {
        //Get Restaurant
        async getRestaurants(req, res) {
            try {
                const limit = req.query.limit || 100
                const restaurants = await getRestaurants(Number(limit))
                if (restaurants.length !== 0) {
                    res.json(restaurants)
                } else {
                    res.json({ status: "No restaurants exist" })
                }
            } catch (e) {
                res.json("something went wrong")
            }
        },
        // Get a restaurant details
        async getARestaurant(req, res) {
            let id = req.params.id
            try {
                const restaurant = await getARestaurant(id)
                if (restaurant !== null) {
                    res.json(restaurant)
                } else {
                    res.json({ status: "Restaurant not exist" })
                }
            } catch (e) {
                res.json('Something went wrong')
            }
        },
        // Create a restaurant
        async createRestaurant(req, res) {
            try {
                const exist = await checkRestaurantExist(req.body.Name)
                if (exist === null) {
                    const restaurant = await createRestaurant(req.body)
                    res.json({ status: 'Restaurant added succussfully', data: restaurant })
                } else {
                    res.json({ status: "failed", data: "Restaurant already exist" })
                }
            } catch (e) {
                res.json({ status: "failed", data: "Something went wrong" })
            }
        },
        // update restaurant address
        async updateRestaurant(req, res) {
            try {
                const id = req.params.id
                const address = req.body["New Address"]
                const restaurant = await updateRestaurant(id, address)
                if (restaurant.nModified === 1) {
                    res.json({ status: 'Restaurant address updated succussfully', data: restaurant })
                } else {
                    res.json({ status: 'Restaurant not exist' })
                }
            } catch (e) {
                res.json({ status: 'some thing went wrong', Error: e })
            }
        },
        //delete a restaurant
        async deleteRestaurant(req, res) {
            try {
                const id = req.params.id
                const deleteDetails = await deleteRestaurant(id)
                if (deleteDetails.deletedCount === 1) {
                    res.json({ status: 'Restaurant deleted succussfully' })
                } else {
                    res.json({ status: 'Restaurant not exist' })
                }
            } catch (e) {
                res.json({ status: 'Some thing went wrong', Error: e })
            }
        },

    }
}

module.exports = restaurants