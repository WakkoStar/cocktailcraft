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
} = require('./mutation');

module.exports.schema = `
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
};
