var _ = require('lodash');
const {
	createDescriptionsOfCocktail,
	createIngredientOfCocktail,
	updateDescriptionOfCocktail,
	updateIngredientOfCocktail,
	deleteIngredientOfCocktail: deleteIngredientOfCocktailInDb,
	deleteDescriptionOfCocktail: deleteDescriptionOfCocktailInDb,
} = require('./data');
const {
	getHelpersCocktails,
	getHelpersIngredient,
} = require('../../utils/finder');

const {
	isValidPreparation,
	isValidDescription,
	isValidVolume,
} = require('../helpers');

const executeRequestElementInDbMessage = (params, callback, msg, ctx) => {
	//to avoid admin rights on create function
	if (!ctx.user.is_admin && !msg.includes('créé')) return null;
	//execute callback
	if (_.some(params, _.isUndefined)) return null;

	callback({ ...params });
	return `${msg} (id_cocktail: ${params.input.id_cocktail})`;
};

const canModifyCocktail = async (id, ctx) => {
	const cocktail = await getHelpersCocktails(id, [false, true]);

	if (!cocktail.isExist) return false;
	if (cocktail.is_visible == true && !ctx.user.is_admin) return false;
	if (ctx.user.id != cocktail.user_id || !ctx.user.is_admin) return false;

	return true;
};

module.exports.createDescriptionCocktail = async (_, { input }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (
			!isValidDescription(input.content) ||
			!isValidPreparation(input.preparation) ||
			!canModifyCocktail(input.id_cocktail, ctx)
		) {
			reject("Can't create description");
			return;
		}

		const succeedMessage = executeRequestElementInDbMessage(
			{
				input: {
					...input,
					content: input.content.trim(),
				},
			},
			createDescriptionsOfCocktail,
			`La description du cocktail vient d'être créé avec succès`,
			ctx
		);

		succeedMessage
			? resolve('Description created')
			: reject("Can't create description");
	});
};

module.exports.createIngredientCocktail = async (_, { input }, ctx) => {
	return new Promise(async (resolve, reject) => {
		const cocktail = await getHelpersCocktails(input.id_cocktail, [
			true,
			false,
		]);
		const canAddIngredient = cocktail.ingredients.length < 20;

		const ingredient = await getHelpersIngredient(input.ingredient_id);
		if (
			!canAddIngredient ||
			!ingredient.isExist ||
			!isValidVolume(input.volume) ||
			!canModifyCocktail(input.id_cocktail, ctx)
		) {
			reject('Cant create this ingredient');
			return;
		}

		const succeedMessage = await executeRequestElementInDbMessage(
			{ input },
			createIngredientOfCocktail,
			`Les ingrédients du cocktail vient d'être créé avec succès`,
			ctx
		);

		succeedMessage
			? resolve('Ingredient created')
			: reject('Cant create this ingredient');
	});
};

module.exports.modifyDescriptionCocktail = async (_, { input }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!canModifyCocktail) {
			reject('invalid cocktail');
			return;
		}

		const succeedMessage = await executeRequestElementInDbMessage(
			{ input },
			updateDescriptionOfCocktail,
			`Les descriptions du cocktail vient d'être modifiés avec succès`,
			ctx
		);

		succeedMessage
			? resolve('Description modified')
			: reject('Cant modify this description');
	});
};

module.exports.modifyIngredientCocktail = async (_, { input }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!canModifyCocktail) {
			reject('invalid cocktail');
			return;
		}
		const succeedMessage = executeRequestElementInDbMessage(
			{ input },
			updateIngredientOfCocktail,
			`Les ingrédients du cocktail vient d'être modifiés avec succès`,
			ctx
		);

		succeedMessage
			? resolve('Ingredient modified')
			: reject('Cant modify this ingredieny');
	});
};

module.exports.deleteIngredientCocktail = async (_, { input }, ctx) => {
	return new Promise(async (resolve, reject) => {
		const succeedMessage = executeRequestElementInDbMessage(
			{ input },
			deleteIngredientOfCocktailInDb,
			`Les ingrédients du cocktail vient d'être supprimés avec succès`,
			ctx
		);

		succeedMessage
			? resolve('Ingredient deleted')
			: reject('Cant delete this ingredieny');
	});
};

module.exports.deleteDescriptionCocktail = async (_, { input }, ctx) => {
	return new Promise(async (resolve, reject) => {
		const succeedMessage = executeRequestElementInDbMessage(
			{ input },
			deleteDescriptionOfCocktailInDb,
			`Les descriptions du cocktail vient d'être supprimés avec succès`,
			ctx
		);

		succeedMessage
			? resolve('Description deleted')
			: reject('Cant delete this description');
	});
};
