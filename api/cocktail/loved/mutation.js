const {
	addLovedCocktail: addLovedCocktailInDb,
	deleteLovedCocktail: deleteLovedCocktailInDb,
} = require('./data');
const { getAllCocktails: getCocktails } = require('../data');
const _ = require('lodash');
const { resolve } = require('path');

const executeRequestInDb = async (params, callback, msg, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (_.some(params, _.isUndefined) && _.isUndefined(ctx.user.id))
			reject('empty fields');
		const cocktails = await getCocktails(true);
		const existsCocktail = cocktails.find(
			cocktail => parseInt(cocktail.id) === params.cocktail_id
		);
		if (existsCocktail) {
			callback(params.cocktail_id, ctx.user.id);
			resolve(`${msg} (cocktail enregistré : ${existsCocktail.nom})`);
		} else {
			reject('ID no founded');
		}
	});
};

module.exports.deleteLovedCocktail = async (_, { cocktail_id }, ctx) => {
	return await executeRequestInDb(
		{ cocktail_id },
		deleteLovedCocktailInDb,
		`Le cocktail vient d'être supprimé avec succès`,
		ctx
	);
};

module.exports.addLovedCocktail = async (_, { cocktail_id }, ctx) => {
	return await executeRequestInDb(
		{ cocktail_id },
		addLovedCocktailInDb,
		`Le cocktail vient d'être ajouté avec succès`,
		ctx
	);
};
