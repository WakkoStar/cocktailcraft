const {
	getAllCocktails,
	getOneCocktails,
	getAvailableCocktails,
	getCraftedCocktails,
	getCreatedCocktailsByUser,
} = require('./query');
const {
	createCocktail,
	modifyCocktail,
	deleteCocktail,
} = require('./mutation');

module.exports.schema = `
    type Cocktails {
        id : Int
        nom : String
        descriptions : [Description]
        ingredients : [Ingredient]
        gout_array : [Int]
		difficulty : String
		user_id: Int
    }
`;

module.exports.resolvers = {
	cocktail: getOneCocktails,
	cocktails: getAllCocktails,
	availCocktails: getAvailableCocktails,
	craftedCocktails: getCraftedCocktails,
	createdCocktailsByUser: getCreatedCocktailsByUser,
	createCocktail,
	modifyCocktail,
	deleteCocktail,
};
