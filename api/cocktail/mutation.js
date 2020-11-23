var _ = require('lodash');
const {
	createCocktail: createCocktailInDb,
	modifyCocktail: modifyCocktailInDb,
	deleteCocktail: deleteCocktailInDb,
	getAllCocktails: getCocktails,
} = require('./data');

const executeRequestInDb = async (params, callback, msg, ctx) => {
	if (!ctx.user.is_admin) throw new Error('Not admin');
	//execute callback
	if (_.some(params, _.isUndefined)) throw new Error('empty fields');
	const cocktails = await getCocktails();
	const existsCocktail = cocktails.find(
		cocktail => parseInt(cocktail.id) === params.id
	);
	if (existsCocktail) {
		callback({ ...params });
		return `${msg} (cocktail: ${existsCocktail.nom})`;
	} else {
		throw new Error('ID no founded');
	}
};

module.exports.createCocktail = async (
	_,
	{ nom, gout_array, difficulty },
	ctx
) => {
	if (!ctx.user.is_admin) throw new Error('Not admin');
	if (!nom || !gout_array || !difficulty) throw new Error('empty fields');
	const cocktails = await getCocktails();
	const existsCocktail = cocktails.find(cocktail => cocktail.nom === nom);
	if (existsCocktail) {
		throw new Error('Cocktail already exists');
	} else {
		const getId = await createCocktailInDb(nom, gout_array, difficulty);
		return `${nom} vient d'être créé avec succès #${getId}`;
	}
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
