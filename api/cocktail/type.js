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
	setVisibility,
} = require('./mutation');

const { getCocktailsLoved } = require('./loved/query');
const { addLovedCocktail, deleteLovedCocktail } = require('./loved/mutation');

const { getHistory } = require('./history/query');
const { addToHistory } = require('./history/mutation');
module.exports.schema = `
    type Cocktails {
        id : Int
        nom : String
        descriptions : [Description]
        ingredients : [Ingredient]
        gout_array : [Int]
		difficulty : String
		user_id: Int
		username: String
    }
`;

module.exports.resolvers = {
	cocktail: getOneCocktails,
	cocktails: getAllCocktails,
	availCocktails: getAvailableCocktails,
	craftedCocktails: getCraftedCocktails,
	createdCocktailsByUser: getCreatedCocktailsByUser,
	lovedCocktails: getCocktailsLoved,
	history: getHistory,
	createCocktail,
	modifyCocktail,
	deleteCocktail,
	addLovedCocktail,
	deleteLovedCocktail,
	setVisibility,
	addToHistory,
};
