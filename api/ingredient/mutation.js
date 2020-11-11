var _ = require('lodash');
const {
	createIngredient: createIngredientInDb,
	modifyIngredient: modifyIngredientInDb,
	deleteIngredient: deleteIngredientInDb,
	getAllIngredients: getIngredients,
} = require('./data');

const executeRequestInDb = async (params, callback, msg, ctx) => {
	if (!ctx.user.is_admin) return 'Not admin';
	if (_.some(params, _.isUndefined)) throw new Error('empty fields');
	const ingredients = await getIngredients();
	const existsIngredients = ingredients.find(
		ingredient => parseInt(ingredient.id) === params.id
	);
	if (existsIngredients) {
		callback({ ...params });
		return `${msg} (ingrédient: ${existsIngredients.nom})`;
	} else {
		throw new Error('ID no founded');
	}
};

module.exports.createIngredient = async (_, { nom, alias, family_of }, ctx) => {
	if (!ctx.user.is_admin) return 'Not admin';
	const ingredients = await getIngredients();
	const existsIngredients = ingredients.find(
		ingredient => ingredient.nom === nom
	);
	if (existsIngredients) {
		throw new Error('Ingredient already exists');
	} else {
		createIngredientInDb(nom, alias, family_of);
		return `${nom} vient d'être créé avec succès`;
	}
};

module.exports.modifyIngredient = async (
	_,
	{ nom, alias, family_of, id },
	ctx
) => {
	return await executeRequestInDb(
		{ nom, alias, family_of, id },
		modifyIngredientInDb,
		"L'ingrédient vient d'être modifié avec succès",
		ctx
	);
};

module.exports.deleteIngredient = async (_, { id }, ctx) => {
	return await executeRequestInDb(
		{ id },
		deleteIngredientInDb,
		"L'ingrédient vient d'être supprimé avec succès",
		ctx
	);
};
