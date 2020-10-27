var _ = require('lodash');
const {
	createDescriptionsOfCocktail,
	createIngredientOfCocktail,
	updateDescriptionOfCocktail,
	updateIngredientOfCocktail,
	deleteIngredientOfCocktail: deleteIngredientOfCocktailInDb,
	deleteDescriptionOfCocktail: deleteDescriptionOfCocktailInDb,
} = require('./data');

const { getAllCocktails: getCocktails } = require('../data');

const executeRequestElementInDb = async (
	params,
	callback,
	msg,
	isIngredient
) => {
	//execute callback
	if (_.some(params, _.isUndefined)) throw new Error('empty fields');

	callback({ ...params });
	return `${msg} (id_cocktail: ${params.input.id_cocktail})`;
};

const verifyCocktail = async id => {
	const cocktails = await getCocktails();
	const existsCocktail = cocktails.find(
		cocktail => parseInt(cocktail.id) === id
	);
	if (!existsCocktail) throw new Error('cocktail no founded');
};

module.exports.createDescriptionCocktail = async (_, { input }) => {
	await verifyCocktail(input.id_cocktail);
	return await executeRequestElementInDb(
		{ input },
		createDescriptionsOfCocktail,
		`La description du cocktail vient d'être créé avec succès`,
		false
	);
};

module.exports.createIngredientCocktail = async (_, { input }) => {
	await verifyCocktail(input.id_cocktail);
	return await executeRequestElementInDb(
		{ input },
		createIngredientOfCocktail,
		`Les ingrédients du cocktail vient d'être créé avec succès`,
		true
	);
};

module.exports.modifyDescriptionCocktail = async (_, { input }) => {
	await verifyCocktail(input.id_cocktail);
	return await executeRequestElementInDb(
		{ input },
		updateDescriptionOfCocktail,
		`Les descriptions du cocktail vient d'être modifiés avec succès`,
		false
	);
};

module.exports.modifyIngredientCocktail = async (_, { input }) => {
	await verifyCocktail(input.id_cocktail);
	return await executeRequestElementInDb(
		{ input },
		updateIngredientOfCocktail,
		`Les ingrédients du cocktail vient d'être modifiés avec succès`,
		true
	);
};

module.exports.deleteIngredientCocktail = async (_, { input }) => {
	return await executeRequestElementInDb(
		{ input },
		deleteIngredientOfCocktailInDb,
		`Les ingrédients du cocktail vient d'être supprimés avec succès`,
		true
	);
};
module.exports.deleteDescriptionCocktail = async (_, { input }) => {
	return await executeRequestElementInDb(
		{ input },
		deleteDescriptionOfCocktailInDb,
		`Les descriptions du cocktail vient d'être supprimés avec succès`,
		false
	);
};
