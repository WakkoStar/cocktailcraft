const { getAllIngredients: getIngredients } = require('./data');
const { getAllCocktails } = require('../cocktail/data');
const { getHasFamily, getIngredientCount } = require('./helpers');
const { getHelpersIngredient } = require('../utils/finder');
const _ = require('lodash');

module.exports.getAllIngredients = async () => {
	const ingredients = await getIngredients();
	return ingredients;
};

module.exports.getAllIngredientsOfFamily = async (__, { family_of }) => {
	const ingredients = await getIngredients();
	const fullfilledIngredients = getHasFamily(ingredients);

	const ingredientsOfThisFamily = fullfilledIngredients.filter(ingredient => {
		const family_ofElement = ingredient.family_of.map(el => parseInt(el));
		return _.intersection(family_ofElement, family_of).length;
	});

	return ingredientsOfThisFamily;
};

module.exports.getOneIngredients = async (_, { id }) => {
	return new Promise(async (resolve, reject) => {
		const ingredient = await getHelpersIngredient(id);
		if (!ingredient.isExist) reject('ingredient no founded');
		resolve(ingredient);
	});
};

module.exports.searchIngredient = async (
	_,
	{ search, isFamilyIncluded = false }
) => {
	const ingredients = await getIngredients();
	const minSearch = search.toLowerCase();

	const results = ingredients.filter(({ nom, alias, hasFamily }) => {
		const withName = nom.toLowerCase().includes(minSearch);
		let withAliases = false;
		if (alias && alias.length)
			withAliases = alias.some(el =>
				el.toLowerCase().includes(minSearch)
			);
		return (
			(withName || withAliases) && (isFamilyIncluded ? true : !hasFamily)
		);
	});

	return results;
};

module.exports.getBestIngredients = async (_, { inventory }) => {
	const ingredients = await getIngredients();
	const cocktails = await getAllCocktails(true);

	let inventoryWithFamilyIncluded = [];
	inventory.forEach(elId => {
		const element = ingredients.find(({ id }) => id == elId);
		inventoryWithFamilyIncluded.push(elId);
		element.family_of.map(el =>
			inventoryWithFamilyIncluded.push(parseInt(el))
		);
	});

	let availableCocktails;
	const isInventory = inventoryWithFamilyIncluded.length > 0;
	if (isInventory) {
		availableCocktails = cocktails.filter(({ ingredients }) => {
			const ingredientArray = ingredients.map(({ ingredient_id }) =>
				parseInt(ingredient_id)
			);
			return inventoryWithFamilyIncluded.some(id =>
				ingredientArray.includes(id)
			);
		});
	} else {
		availableCocktails = cocktails;
	}
	let countedIng = ingredients.map(ingredient => {
		return {
			...ingredient,
			count: getIngredientCount(
				availableCocktails,
				ingredient.id,
				ingredient.family_of
			),
		};
	});
	let sortedIng = countedIng.sort((a, b) => b.count - a.count);
	return sortedIng.filter(
		ingredient =>
			!inventory.includes(parseInt(ingredient.id)) &&
			!ingredient.hasFamily
	);
};

module.exports.inventorySelection = async (
	_,
	{ inventory, cluster, preparations }
) => {
	const ingredientsInDb = await getIngredients();
	const inventoryIng = ingredientsInDb.filter(({ id }) =>
		inventory.includes(parseInt(id))
	);
	const cocktails = await getAllCocktails(true);

	let clusterCocktails = cocktails.filter(({ ingredients, descriptions }) => {
		const ingredientArray = ingredients.map(({ ingredient_id }) =>
			parseInt(ingredient_id)
		);

		let isInCluster = true;
		if (cluster) {
			if (cluster.length > 0) {
				isInCluster = cluster.every(id => {
					const { family_of } = inventoryIng.find(
						({ id: elId }) => parseInt(elId) == id
					);
					const isInFamily = family_of.some(element =>
						ingredientArray.includes(parseInt(element))
					);
					return ingredientArray.includes(id) || isInFamily;
				});
			}
		}

		const isInInventory = ingredientArray.every(id => {
			const isInFamily = inventoryIng.find(({ family_of }) =>
				family_of.map(el => parseInt(el)).includes(id)
			);
			return inventory.includes(parseInt(id)) || isInFamily;
		});

		const isInPreparation = descriptions.some(({ preparation }) =>
			preparations.includes(preparation)
		);

		return isInCluster && isInInventory && isInPreparation;
	});
	let countedIng = inventoryIng.map(ingredient => {
		return {
			...ingredient,
			count: getIngredientCount(
				clusterCocktails,
				ingredient.id,
				ingredient.family_of
			),
		};
	});
	let sortedIng = countedIng.sort((a, b) => b.count - a.count);
	return sortedIng.filter(ingredient => {
		const ingredientAlreadyInCluster = !cluster.includes(ingredient.id);
		const isCounted = ingredient.count;
		return ingredientAlreadyInCluster && isCounted;
	});
};
