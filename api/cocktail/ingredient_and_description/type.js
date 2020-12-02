const {
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
        id_cocktail: Int
    }

    type Ingredient {
        id: Int
        ingredient_id: Int
        volume: String
        nom: String
        id_cocktail: Int
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
`;

module.exports.resolvers = {
	createDescriptionCocktail,
	createIngredientCocktail,
	modifyDescriptionCocktail,
	modifyIngredientCocktail,
	deleteDescriptionCocktail,
	deleteIngredientCocktail,
};
