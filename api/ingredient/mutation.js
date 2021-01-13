var _ = require('lodash');
const {
	createIngredient: createIngredientInDb,
	modifyIngredient: modifyIngredientInDb,
	deleteIngredient: deleteIngredientInDb,
} = require('./data');

const { getHelpersIngredient } = require('../utils/finder');

const executeRequestInDb = async (params, callback, msg, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!ctx.user.is_admin) {
			reject('Not admin');
			return;
		}
		if (_.some(params, _.isUndefined)) {
			reject('empty fields');
			return;
		}

		const ingredient = await getHelpersIngredient(params.id);
		if (ingredient.isExist) {
			callback({ ...params });
			resolve(`${msg} (ingrédient: ${ingredient.nom})`);
		} else {
			reject('ID no founded');
		}
	});
};

module.exports.createIngredient = async (_, { nom, alias, family_of }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!ctx.user.is_admin) {
			reject('Not admin');
			return;
		}
		const ingredient = await getHelpersIngredient(null, nom);
		if (ingredient.isExist) {
			reject('Ingredient already exists');
		} else {
			createIngredientInDb(nom, alias, family_of);
			resolve(`${nom} vient d'être créé avec succès`);
		}
	});
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
