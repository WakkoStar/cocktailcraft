const {getAllCocktails, getOneCocktails, getAvailableCocktails, getCreatedCocktails} = require('./query')
const {createCocktail, modifyCocktail, deleteCocktail} = require('./mutation')

module.exports.schema = `
    type Cocktails {
        id : Int
        name : String
        ingredient_id : [Int]
        gout_id : [Int]
        description : String 
        difficulty_id : Int
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