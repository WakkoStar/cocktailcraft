const {
	getAllCocktails,
	getOneCocktails,
	getAvailableCocktails,
	getCreatedCocktails,
} = require('./query');
const {
	createCocktail,
	modifyCocktail,
	deleteCocktail,
	createDescriptionCocktail,
	createIngredientCocktail,
	modifyDescriptionCocktail,
	modifyIngredientCocktail,
	deleteIngredientCocktail,
	deleteDescriptionCocktail,
} = require('./mutation');

module.exports.schema = `
    type Description {
        id: Int
        content : String
        preparation: String
        cocktail_id: Int
    }

    type Ingredient {
        id: Int
        ingredient_id: Int
        volume: String
        nom: String
        cocktail_id: Int
    }

    input descriptionInput {
        content : String!
        preparation: String!
        id_cocktail: Int!
    }

    input ingredientInput {
        ingredient_id: Int!
        volume: String!
        id_cocktail: Int!
    }

    type Cocktails {
        id : Int
        nom : String
        descriptions : [Description]
        ingredients : [Ingredient]
        gout_array : [Int]
        difficulty : String
    }
`;

module.exports.resolvers = {
	cocktail: getOneCocktails,
	cocktails: getAllCocktails,
	availCocktails: getAvailableCocktails,
	createdCocktails: getCreatedCocktails,
	createCocktail,
	modifyCocktail,
	deleteCocktail,
	createDescriptionCocktail,
	createIngredientCocktail,
	modifyDescriptionCocktail,
	modifyIngredientCocktail,
	deleteDescriptionCocktail,
	deleteIngredientCocktail,
};
