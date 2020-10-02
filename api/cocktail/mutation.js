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
	getAllIngredients,
	getAllDescriptions,
} = require('./data');

const executeRequestInDb = async (params, callback, msg) => {
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

const executeRequestElementInDb = async (
	params,
	callback,
	msg,
	isIngredient
) => {
	//execute callback
	if (_.some(params, _.isUndefined)) throw new Error('empty fields');

	//in case of create Descriptions or Ingredients
	if (!params.id) {
		callback({ ...params });
		return `${msg} (id_cocktail: ${params.input.id_cocktail})`;
	}

	//in case of edit or delete
	const elements = isIngredient
		? await getAllIngredients()
		: await getAllDescriptions();
	const elementFinded = elements.find(
		element => parseInt(element.id) === params.id
	);
	if (elementFinded) {
		callback({ ...params });
		return `${msg} (element: ${elementFinded.id})`;
	} else {
		throw new Error('ID no founded');
	}
};

const verifyCocktail = async id => {
	const cocktails = await getCocktails();
	const existsCocktail = cocktails.find(
		cocktail => parseInt(cocktail.id) === id
	);
	if (!existsCocktail) throw new Error('cocktail no founded');
};

module.exports.createCocktail = async (_, { nom, gout_array, difficulty }) => {
	if (!nom || !gout_array || !difficulty) throw new Error('empty fields');
	const cocktails = await getCocktails();
	const existsCocktail = cocktails.find(cocktail => cocktail.nom === nom);
	if (existsCocktail) {
		throw new Error('Cocktail already exists');
	} else {
		createCocktailInDb(nom, gout_array, difficulty);
		return `${nom} vient d'être créé avec succès`;
	}
};

module.exports.modifyCocktail = async (
	_,
	{ nom, gout_array, difficulty, id }
) => {
	return await executeRequestInDb(
		{ nom, gout_array, difficulty, id },
		modifyCocktailInDb,
		`Le cocktail vient d'être modifié avec succès`
	);
};

module.exports.deleteCocktail = async (_, { id }) => {
	return await executeRequestInDb(
		{ id },
		deleteCocktailInDb,
		`Le cocktail vient d'être supprimé avec succès`
	);
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

module.exports.modifyDescriptionCocktail = async (_, { input, id }) => {
	await verifyCocktail(input.id_cocktail);
	return await executeRequestElementInDb(
		{ input, id },
		updateDescriptionOfCocktail,
		`Les descriptions du cocktail vient d'être modifiés avec succès`,
		false
	);
};

module.exports.modifyIngredientCocktail = async (_, { input, id }) => {
	await verifyCocktail(input.id_cocktail);
	return await executeRequestElementInDb(
		{ input, id },
		updateIngredientOfCocktail,
		`Les ingrédients du cocktail vient d'être modifiés avec succès`,
		true
	);
};

module.exports.deleteIngredientCocktail = async (_, { id }) => {
	return await executeRequestElementInDb(
		{ id, db: 'ingredient_cocktail' },
		deleteOfCocktail,
		`Les ingrédients du cocktail vient d'être supprimés avec succès`,
		true
	);
};
module.exports.deleteDescriptionCocktail = async (_, { id }) => {
	return await executeRequestElementInDb(
		{ id, db: 'description_cocktail' },
		deleteOfCocktail,
		`Les descriptions du cocktail vient d'être supprimés avec succès`,
		false
	);
};
