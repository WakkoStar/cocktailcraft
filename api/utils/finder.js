const { getAllCocktails } = require('../cocktail/data');
const { getAllIngredients } = require('../ingredient/data');
const _ = require('lodash');
module.exports.getHelpersCocktails = async (
	cocktail_id,
	visibilities = [true],
	nom = undefined
) => {
	const cocktailsArray = await Promise.all(
		visibilities.map(async isVisible => {
			return getAllCocktails(isVisible);
		})
	);

	const cocktails = cocktailsArray.flat();

	const cocktail = !_.isUndefined(nom)
		? cocktails.find(c => c.nom === nom)
		: cocktails.find(({ id }) => parseInt(id) === parseInt(cocktail_id));

	return {
		...cocktail,
		isExist: cocktail != undefined,
	};
};

module.exports.getHelpersIngredient = async (
	ingredient_id,
	nom = undefined
) => {
	const ingredients = await getAllIngredients();

	const ingredient = !_.isUndefined(nom)
		? ingredients.find(i => i.nom === nom)
		: ingredients.find(
				({ id }) => parseInt(id) === parseInt(ingredient_id)
		  );

	return {
		...ingredient,
		isExist: ingredient != undefined,
	};
};
