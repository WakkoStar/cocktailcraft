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

const executeRequestElementInDb = (params, callback, msg, ctx) => {
	return new Promise(async (resolve, reject) => {
		//to avoid admin rights on create functionS
		if (!ctx.user.is_admin && !msg.includes('créé')) reject('Not admin');
		//execute callback
		if (_.some(params, _.isUndefined)) reject('empty fields');

		callback({ ...params });
		resolve(`${msg} (id_cocktail: ${params.input.id_cocktail})`);
	});
};

const verifyCocktail = id => {
	return new Promise(async (resolve, reject) => {
		const res1 = await getCocktails(false);
		const res2 = await getCocktails(true);
		const cocktails = res1.concat(res2);
		const existsCocktail = cocktails.find(
			cocktail => parseInt(cocktail.id) === parseInt(id)
		);
		existsCocktail
			? resolve('Cocktail founded')
			: reject('cocktail no founded');
	});
};

module.exports.createDescriptionCocktail = async (_, { input }, ctx) => {
	verifyCocktail(input.id_cocktail);
	return await executeRequestElementInDb(
		{ input },
		createDescriptionsOfCocktail,
		`La description du cocktail vient d'être créé avec succès`,
		ctx
	);
};

module.exports.createIngredientCocktail = async (_, { input }, ctx) => {
	verifyCocktail(input.id_cocktail);
	return await executeRequestElementInDb(
		{ input },
		createIngredientOfCocktail,
		`Les ingrédients du cocktail vient d'être créé avec succès`,
		ctx
	);
};

module.exports.modifyDescriptionCocktail = async (_, { input }, ctx) => {
	verifyCocktail(input.id_cocktail);
	return await executeRequestElementInDb(
		{ input },
		updateDescriptionOfCocktail,
		`Les descriptions du cocktail vient d'être modifiés avec succès`,
		ctx
	);
};

module.exports.modifyIngredientCocktail = async (_, { input }, ctx) => {
	verifyCocktail(input.id_cocktail);
	return await executeRequestElementInDb(
		{ input },
		updateIngredientOfCocktail,
		`Les ingrédients du cocktail vient d'être modifiés avec succès`,
		ctx
	);
};

module.exports.deleteIngredientCocktail = async (_, { input }, ctx) => {
	return await executeRequestElementInDb(
		{ input },
		deleteIngredientOfCocktailInDb,
		`Les ingrédients du cocktail vient d'être supprimés avec succès`,
		ctx
	);
};
module.exports.deleteDescriptionCocktail = async (_, { input }, ctx) => {
	return await executeRequestElementInDb(
		{ input },
		deleteDescriptionOfCocktailInDb,
		`Les descriptions du cocktail vient d'être supprimés avec succès`,
		ctx
	);
};
