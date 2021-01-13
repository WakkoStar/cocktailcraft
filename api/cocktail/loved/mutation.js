const {
	addLovedCocktail: addLovedCocktailInDb,
	deleteLovedCocktail: deleteLovedCocktailInDb,
} = require('./data');
const { getHelpersCocktails } = require('../../utils/finder');
const _ = require('lodash');

const executeRequestInDb = async (params, callback, msg, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (_.some(params, _.isUndefined) && _.isUndefined(ctx.user.id)) {
			reject('empty fields');
			return;
		}
		const cocktail = await getHelpersCocktails(params.cocktail_id, [true]);

		if (cocktail.isExist) {
			callback(params.cocktail_id, ctx.user.id);
			resolve(`${msg} (cocktail enregistré : ${cocktail.nom})`);
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
