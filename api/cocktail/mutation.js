var _ = require('lodash');
const {
	createCocktail: createCocktailInDb,
	modifyCocktail: modifyCocktailInDb,
	deleteCocktail: deleteCocktailInDb,
	getAllCocktails: getCocktails,
	createDescriptionsOfCocktail,
	createIngredientOfCocktail,
	updateDescriptionOfCocktail,
	updateIngredientOfCocktail,
	deleteOfCocktail,
} = require('./data');

const executeRequestInDb = async (params, hasInput, callback, msg) => {
	//define id
	const id = hasInput ? params.input.id_cocktail : params.id;
	//execute callback
	if (_.some(params, _.isUndefined)) throw new Error('empty fields');
	const cocktails = await getCocktails();
	const existsCocktail = cocktails.find(cocktail => cocktail.id == id);
	if (existsCocktail) {
		callback({ ...params });
		return `${msg} (cocktail: ${existsCocktail.nom})`;
	} else {
		throw new Error('ID no founded');
	}
};

module.exports.createCocktail = async (_, { nom, gout_array, difficulty }) => {
	if (!nom || !gout_array || !difficulty) throw new Error('empty fields');
	const cocktails = await getCocktails();
	const existsCocktail = cocktails.find(cocktail => cocktail.nom == nom);
	if (existsCocktail) {
		throw new Error('Cocktail already exists');
	} else {
		createCocktailInDb(nom, gout_array, difficulty);
		return `${nom} vient d'etre créé avec succès`;
	}
};

module.exports.modifyCocktail = async (
	_,
	{ nom, gout_array, difficulty, id }
) => {
	return await executeRequestInDb(
		{ nom, gout_array, difficulty, id },
		false,
		modifyCocktailInDb,
		`Le cocktail vient d'être modifié avec succès`
	);
};

module.exports.deleteCocktail = async (_, { id }) => {
	return await executeRequestInDb(
		{ id },
		false,
		deleteCocktailInDb,
		`Le cocktail vient d'être supprimé avec succès`
	);
};

module.exports.createDescriptionCocktail = async (_, { input }) => {
	return await executeRequestInDb(
		{ input },
		true,
		createDescriptionsOfCocktail,
		`La description du cocktail vient d'être créé avec succès`
	);
};

module.exports.createIngredientCocktail = async (_, { input }) => {
	return await executeRequestInDb(
		{ input },
		true,
		createIngredientOfCocktail,
		`Les ingrédients du cocktail vient d'être créé avec succès`
	);
};

module.exports.modifyDescriptionCocktail = async (_, { input, id }) => {
	return await executeRequestInDb(
		{ input, id },
		true,
		updateDescriptionOfCocktail,
		`Les descriptions du cocktail vient d'être modifiés avec succès`
	);
};

module.exports.modifyIngredientCocktail = async (_, { input, id }) => {
	return await executeRequestInDb(
		{ input, id },
		true,
		updateIngredientOfCocktail,
		`Les ingrédients du cocktail vient d'être modifiés avec succès`
	);
};

module.exports.deleteIngredientCocktail = async (_, { id }) => {
	return await executeRequestInDb(
		{ id, db: 'ingredient_cocktail' },
		false,
		deleteOfCocktail,
		`Les ingrédients du cocktail vient d'être supprimés avec succès`
	);
};
module.exports.deleteDescriptionCocktail = async (_, { id }) => {
	return await executeRequestInDb(
		{ id, db: 'description_cocktail' },
		false,
		deleteOfCocktail,
		`Les descriptions du cocktail vient d'être supprimés avec succès`
	);
};
