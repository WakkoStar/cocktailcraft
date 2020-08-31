const {getOneIngredients, getAllIngredients, getBestIngredients, inventorySelection, searchIngredient} = require('./query')
const {createIngredient, modifyIngredient, deleteIngredient} = require('./mutation')

module.exports.schema =`
    type Ingredients {
        id: Int
        name: String
        aliases: [String]
    }
`

module.exports.resolvers = {
    ingredient: getOneIngredients,
    ingredients: getAllIngredients,
    bestIngredients: getBestIngredients,
    searchIngredient,
    inventorySelection,
    createIngredient,
    modifyIngredient,
    deleteIngredient
}