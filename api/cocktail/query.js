const {
	getAllCocktails: getCocktails,
	getCreatedCocktailsByUser: getCreatedCocktailsByUserDb,
} = require('./data');
const { getAllIngredients } = require('../ingredient/data');
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

module.exports.getAvailableCocktails = async (
	_,
	{ ingredient_array: inventory }
) => {
	const cocktails = await getCocktails(true);
	const ingredientsInDb = await getAllIngredients();
	const inventoryIng = ingredientsInDb.filter(({ id }) =>
		inventory.includes(parseInt(id))
	);

	const availCocktails = cocktails.filter(cocktail => {
		return cocktail.ingredients.every(({ ingredient_id: id }) => {
			const isInFamily = inventoryIng.find(({ family_of }) => {
				return family_of.map(el => parseInt(el)).includes(parseInt(id));
			});
			return inventory.includes(parseInt(id)) || !!isInFamily;
		});
	});
	return availCocktails;
};

module.exports.getCraftedCocktails = async (_, { cluster }) => {
	const cocktails = await getCocktails(true);
	const ingredientsInDb = await getAllIngredients();
	const clusterIng = ingredientsInDb.filter(({ id }) =>
		cluster.includes(parseInt(id))
	);

	const createdCocktails = cocktails.filter(({ ingredients }) => {
		const ingredientArray = ingredients.map(({ ingredient_id }) =>
			parseInt(ingredient_id)
		);

		const isInCocktail = ingredientArray.every(id => {
			const isInFamily = clusterIng.find(({ family_of }) =>
				family_of.map(el => parseInt(el)).includes(id)
			);
			return cluster.includes(id) || !!isInFamily;
		});

		return isInCocktail;
	});

	return createdCocktails;
};

module.exports.getCreatedCocktailsByUser = async (_, {}, ctx) => {
	const cocktails = await getCreatedCocktailsByUserDb(ctx.user.id);
	return cocktails;
};
