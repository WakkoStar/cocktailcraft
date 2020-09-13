const {getAllCocktails, getOneCocktails, getAvailableCocktails, getCreatedCocktails} = require('./query')
const {createCocktail, modifyCocktail, deleteCocktail} = require('./mutation')

module.exports.schema = `
    type Description {
        content : String
        preparation: String
    }

    type Ingredient {
        ingredient_id: Int
        volume: String
    }
    
    input descriptionInput {
        content : String
        preparation: String
    }

    input ingredientInput {
        ingredient_id: Int
        volume: String
    }

    type Cocktails {
        id : Int
        nom : String
        descriptions : [Description]
        ingredients : [Ingredient]
        gout_array : [Int]
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