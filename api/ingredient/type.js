const {
	getOneIngredients,
	getAllIngredients,
	getBestIngredients,
	inventorySelection,
	searchIngredient,
} = require('./query');
const {
	createIngredient,
	modifyIngredient,
	deleteIngredient,
} = require('./mutation');

module.exports.schema = `
    type Ingredients {
        id: Int
        nom: String
        alias: [String]
        family_of: [Int]
    }
`;

module.exports.resolvers = {
	ingredient: getOneIngredients,
	ingredients: getAllIngredients,
	bestIngredients: getBestIngredients,
	searchIngredient,
	inventorySelection,
	createIngredient,
	modifyIngredient,
	deleteIngredient,
};
