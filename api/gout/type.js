const {getOneGouts, getAllGouts} = require('./query')

module.exports.schema =`
    type Gouts {
        id: Int
        name: String
    }
`

module.exports.resolvers = {
    gout: getOneGouts,
    gouts: getAllGouts,
}