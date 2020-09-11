const {getAllCocktails, getOneCocktails, getAvailableCocktails, getCreatedCocktails} = require('./query')
const {createCocktail, modifyCocktail, deleteCocktail} = require('./mutation')

module.exports.schema = `
    type Cocktails {
        id : Int
        nom : String
        ingredient_array : [Int]
        gout_array : [Int]
        description_array : [Int]
        difficulty : String
    }
`

module.exports.resolvers = {
    cocktail: getOneCocktails,
    cocktails : getAllCocktails,
    availCocktails: getAvailableCocktails,
    createdCocktails: getCreatedCocktails,
    createCocktail,
    modifyCocktail,
    deleteCocktail
}