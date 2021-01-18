const {
    getAllResults
} = require('../../../libs/commonDb/dbFunctions')

function markList() {
    return {
        //Get all Student details
        async homePage(req, res) {
            try {
                const result = await getAllResults()
                if (result.length !== 0) {
                    res.status(200).json({data: result})
                } else {
                    res.status(404).json({ status: "No result published" })
                }
            } catch (e) {
                res.status(500).json(["something went wrong"])
            }
        },
    }
}

module.exports = markList