var _ = require('lodash');
const {
	createCocktail: createCocktailInDb,
	modifyCocktail: modifyCocktailInDb,
	deleteCocktail: deleteCocktailInDb,
	setVisibility: setVisibilityInDb,
} = require('./data');

const { updateUserExp, updateCocktailCreatedInDay } = require('../users/data');
const { getAllCocktails: getCocktails } = require('./data');

const getConcatedCocktails = async () => {
	const res1 = await getCocktails(false);
	const res2 = await getCocktails(true);
	const cocktails = res1.concat(res2);
	return cocktails;
};

const executeRequestInDb = async (params, callback, msg, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!ctx.user.is_admin) reject('Not admin');
		//execute callback
		if (_.some(params, _.isUndefined)) reject('empty fields');
		const cocktails = await getConcatedCocktails();
		const existsCocktail = cocktails.find(
			cocktail => parseInt(cocktail.id) === params.id
		);
		if (existsCocktail) {
			callback({ ...params });
			resolve(`${msg} (cocktail: ${existsCocktail.nom})`);
		} else {
			reject('ID no founded');
		}
	});
};

module.exports.createCocktail = async (
	__,
	{ nom, gout_array, difficulty },
	ctx
) => {
	return new Promise(async (resolve, reject) => {
		if (!nom || !gout_array || !difficulty) reject('empty fields');
		const cocktails = await getConcatedCocktails();
		const existsCocktail = cocktails.find(cocktail => cocktail.nom === nom);
		if (existsCocktail || ctx.user.cocktail_created_in_day >= 10) {
			reject("Cocktail already exists or you can't create new cocktail");
		} else {
			const getId = await createCocktailInDb(
				nom,
				gout_array,
				difficulty,
				ctx.user.id
			);
			updateCocktailCreatedInDay(
				Number(ctx.user.cocktail_created_in_day) + 1,
				ctx.user.id
			);
			updateUserExp(Number(ctx.user.experience) + 100, ctx.user.id);
			resolve(`${getId}`);
		}
	});
};

module.exports.modifyCocktail = async (
	_,
	{ nom, gout_array, difficulty, id },
	ctx
) => {
	return await executeRequestInDb(
		{ nom, gout_array, difficulty, id },
		modifyCocktailInDb,
		`Le cocktail vient d'être modifié avec succès`,
		ctx
	);
};

module.exports.deleteCocktail = async (_, { id }, ctx) => {
	return await executeRequestInDb(
		{ id },
		deleteCocktailInDb,
		`Le cocktail vient d'être supprimé avec succès`,
		ctx
	);
};

module.exports.setVisibility = async (_, { is_visible, id }, ctx) => {
	return await executeRequestInDb(
		{ is_visible, id },
		setVisibilityInDb,
		`Le cocktail vient de changer de vue avec succès`,
		ctx
	);
};
