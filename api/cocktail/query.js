const {
	getAllCocktails: getCocktails,
	getCreatedCocktailsByUser: getCreatedCocktailsByUserDb,
} = require('./data');
const _ = require('lodash');
const { getHelpersCocktails } = require('../utils/finder');

module.exports.getAllCocktails = async (__, { is_visible }, ctx) => {
	const isVisible = _.isNil(is_visible) ? true : is_visible;
	return new Promise(async (resolve, reject) => {
		if (!is_visible && !ctx.user.is_admin) {
			reject('Not admin');
			return;
		}
		const cocktails = await getCocktails(isVisible);
		resolve(cocktails);
	});
};

module.exports.getOneCocktails = async (__, { id, is_visible = true }, ctx) => {
	const isVisible = _.isNil(is_visible) ? true : is_visible;
	return new Promise(async (resolve, reject) => {
		if (!is_visible && !ctx.user.is_admin) {
			reject('Not admin');
			return;
		}
		const cocktail = await getHelpersCocktails(id, [isVisible]);
		if (!cocktail.isExist) {
			reject('cocktail no founded');
			return;
		}
		resolve(cocktail);
	});
};

module.exports.getAvailableCocktails = async (_, { ingredient_array }) => {
	const cocktails = await getCocktails(true);
	const availCocktails = cocktails.filter(
		//For each cocktail
		cocktail => {
			//check if all ingredients of the cocktail
			return cocktail.ingredients.every(({ ingredient_id }) => {
				//is included within the parameter
				return ingredient_array.includes(parseInt(ingredient_id));
			});
		}
	);
	return availCocktails;
};

module.exports.getCraftedCocktails = async (_, { cluster }) => {
	const cocktails = await getCocktails(true);
	const createdCocktails = cocktails.filter(({ ingredients }) => {
		const ingredientArray = ingredients.map(({ ingredient_id }) =>
			parseInt(ingredient_id)
		);
		const inCocktail = ingredientArray.every(id => cluster.includes(id));
		const inCluster = cluster.every(id => ingredientArray.includes(id));

		return inCocktail && inCluster;
	});

	return createdCocktails;
};

module.exports.getCreatedCocktailsByUser = async (_, {}, ctx) => {
	const cocktails = await getCreatedCocktailsByUserDb(ctx.user.id);
	return cocktails;
};
