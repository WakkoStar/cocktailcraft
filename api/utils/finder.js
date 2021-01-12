const { getAllCocktails } = require('../cocktail/data');
const { getAllIngredients } = require('../ingredient/data');

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

	const cocktail = nom
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

	const ingredient = nom
		? ingredients.find(i => i.nom === nom)
		: ingredients.find(
				({ id }) => parseInt(id) === parseInt(ingredient_id)
		  );

	return {
		...ingredient,
		isExist: ingredient != undefined,
	};
};
