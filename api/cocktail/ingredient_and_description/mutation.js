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
	parseVolume,
} = require('../helpers');

const executeRequestElementInDb = (
	params,
	callback,
	ctx,
	isNeedToBeAdmin = true
) => {
	//to avoid admin rights on create function
	if (!ctx.user.is_admin && isNeedToBeAdmin) return false;
	//execute callback
	if (_.some(params.input, _.isNil)) return false;
	callback({ ...params });
	return true;
};

const canModifyCocktail = async (id, ctx) => {
	const cocktail = await getHelpersCocktails(id, [false]);
	if (!cocktail.isExist) return false;
	if (
		ctx.user.is_admin === false &&
		parseInt(ctx.user.id) !== parseInt(cocktail.user_id)
	)
		return false;
	return true;
};

module.exports.createDescriptionCocktail = async (_, { input }, ctx) => {
	return new Promise(async (resolve, reject) => {
		const cocktail = await getHelpersCocktails(input.id_cocktail, [false]);
		const isPrepararation = cocktail.descriptions?.find(
			({ preparation }) => preparation === input.preparation
		);
		if (isPrepararation) {
			reject('Preparation already added');
			return;
		}

		if (
			!isValidDescription(input.content) ||
			!isValidPreparation(input.preparation) ||
			!(await canModifyCocktail(input.id_cocktail, ctx))
		) {
			reject("Can't create description, no valid");
			return;
		}
		const isSucceed = executeRequestElementInDb(
			{
				input: {
					...input,
					content: input.content.trim(),
				},
			},
			createDescriptionsOfCocktail,
			ctx,
			false
		);
		isSucceed
			? resolve('Description created')
			: reject("Can't create description");
	});
};

module.exports.createIngredientCocktail = async (_, { input }, ctx) => {
	return new Promise(async (resolve, reject) => {
		const cocktail = await getHelpersCocktails(input.id_cocktail, [false]);
		const canAddIngredient = cocktail?.ingredients?.length < 15;

		const ingredient = await getHelpersIngredient(input.ingredient_id);
		if (
			!canAddIngredient ||
			!ingredient.isExist ||
			!isValidVolume(input.volume) ||
			!(await canModifyCocktail(input.id_cocktail, ctx))
		) {
			reject('Cant create this ingredient, no valid');
			return;
		}

		const isSucceed = executeRequestElementInDb(
			{ input: { ...input, volume: parseVolume(input.volume) } },
			createIngredientOfCocktail,
			ctx,
			false
		);

		isSucceed
			? resolve('Ingredient created')
			: reject('Cant create this ingredient');
	});
};

module.exports.modifyDescriptionCocktail = async (_, { input }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!(await canModifyCocktail(input.id_cocktail, ctx))) {
			reject('invalid cocktail');
			return;
		}

		const isSucceed = executeRequestElementInDb(
			{ input },
			updateDescriptionOfCocktail,
			ctx
		);

		isSucceed
			? resolve('Description modified')
			: reject('Cant modify this description');
	});
};

module.exports.modifyIngredientCocktail = async (_, { input }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!(await canModifyCocktail(input.id_cocktail, ctx))) {
			reject('invalid cocktail');
			return;
		}
		const isSucceed = executeRequestElementInDb(
			{ input },
			updateIngredientOfCocktail,
			ctx
		);

		isSucceed
			? resolve('Ingredient modified')
			: reject('Cant modify this ingredient');
	});
};

module.exports.deleteIngredientCocktail = async (_, { input }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!(await canModifyCocktail(input.id_cocktail, ctx))) {
			reject('invalid cocktail');
			return;
		}
		const isSucceed = executeRequestElementInDb(
			{ input },
			deleteIngredientOfCocktailInDb,
			ctx
		);

		isSucceed
			? resolve('Ingredient deleted')
			: reject('Cant delete this ingredient');
	});
};

module.exports.deleteDescriptionCocktail = async (_, { input }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!(await canModifyCocktail(input.id_cocktail, ctx))) {
			reject('invalid cocktail');
			return;
		}
		const isSucceed = executeRequestElementInDb(
			{ input },
			deleteDescriptionOfCocktailInDb,
			ctx
		);

		isSucceed
			? resolve('Description deleted')
			: reject('Cant delete this description');
	});
};
