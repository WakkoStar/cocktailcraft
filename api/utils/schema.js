const {schema:ingredientSchema, resolvers:ingredientResolvers} = require("../ingredient/type")
const {schema: cocktailSchema, resolvers: cocktailResolvers} = require("../cocktail/type")
const {schema:goutSchema, resolvers:goutResolvers} = require("../gout/type")
var { buildSchema } = require('graphql');

module.exports.schema = buildSchema(
    `
    type Query {
        ingredient(id: Int!): Ingredients
        ingredients: [Ingredients]
        bestIngredients(inventory:[Int]): [Ingredients]
        inventorySelection(cluster:[Int], inventory:[Int], filter_gout:[Int], filter_difficulty:[Int]): [Ingredients]
        searchIngredient(search: String): [Ingredients]

        gout(id: Int!): Gouts
        gouts: [Gouts]

        cocktail(id : Int!): Cocktails
        cocktails : [Cocktails]
        availCocktails(ingredient_id : [Int!]!) : [Cocktails]
        createdCocktails(cluster: [Int]): [Cocktails]
    }
    type Mutation {
        createIngredient(name: String, aliases:[String]): String
        modifyIngredient(name: String, aliases:[String], id: Int): String
        deleteIngredient(id: Int): String
        
        createCocktail(name: String, ingredient_id:[Int], gout_id: [Int], description: String, difficulty_id : Int) : String
        modifyCocktail(name: String, ingredient_id:[Int], gout_id: [Int], description: String, difficulty_id : Int, id: Int) : String
        deleteCocktail(id: Int): String
    }
    `
    + ingredientSchema 
    + cocktailSchema
    + goutSchema
);

const {
    ingredient, 
    ingredients, 
    bestIngredients,
    inventorySelection,
    searchIngredient,
    createIngredient, 
    modifyIngredient,
    deleteIngredient
} = ingredientResolvers

const {
    cocktail,
    cocktails,
    availCocktails,
    createdCocktails,
    createCocktail,
    modifyCocktail,
    deleteCocktail
} = cocktailResolvers

const {
    gout,
    gouts
} = goutResolvers

module.exports.root = {
    ingredient,
    ingredients,
    bestIngredients,
    searchIngredient,
    inventorySelection,
    createIngredient,
    modifyIngredient,
    deleteIngredient,

    gout,
    gouts,

    cocktail,
    cocktails,
    availCocktails,
    createdCocktails,
    createCocktail,
    modifyCocktail,
    deleteCocktail
}
