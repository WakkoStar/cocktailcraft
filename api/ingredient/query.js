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

module.exports.searchIngredient = async (_, { search }) => {
	const ingredients = await getIngredients();
	const minSearch = search.toLowerCase();

	const results = ingredients.filter(({ nom, alias, hasFamily }) => {
		const withName = nom.toLowerCase().includes(minSearch);
		let withAliases = false;
		if (alias && alias.length)
			withAliases = alias.some(el =>
				el.toLowerCase().includes(minSearch)
			);
		return (withName || withAliases) && !hasFamily;
	});

	return results;
};

//inventory = {2, 4, 5, 9} => id of ingredient
module.exports.getBestIngredients = async (_, { inventory }) => {
	const ingredients = await getIngredients();
	const cocktails = await getAllCocktails(true);
	let availableCocktails;
	//get cocktail includes inventory
	if (inventory.length > 0) {
		availableCocktails = cocktails.filter(({ ingredients }) => {
			const ingredientArray = ingredients.map(({ ingredient_id }) =>
				parseInt(ingredient_id)
			);
			return inventory.some(id => ingredientArray.includes(id));
		});
		//all cocktails
	} else {
		availableCocktails = cocktails;
	}
	//add count property
	let countedIng = ingredients.map(ingredient => {
		return {
			...ingredient,
			count: getIngredientCount(availableCocktails, ingredient.id),
		};
	});
	//sort by count
	let sortedIng = countedIng.sort((a, b) => b.count - a.count);
	//filter ingredient which already in inventory
	return sortedIng.filter(
		ingredient =>
			!inventory.includes(parseInt(ingredient.id)) &&
			!ingredient.hasFamily
	);
};

module.exports.inventorySelection = async (_, { inventory, cluster }) => {
	//get ingredients of the inventory
	const ingredients = await getIngredients();
	const inventoryIng = ingredients.filter(({ id }) =>
		inventory.includes(parseInt(id))
	);
	//get cocktails filtered by the cluster
	const cocktails = await getAllCocktails(true);

	//select only cocktail available with the cluster
	let clusterCocktails = cocktails.filter(({ ingredients }) => {
		const ingredientArray = ingredients.map(({ ingredient_id }) =>
			parseInt(ingredient_id)
		);
		//tous les ingrédients du cluster sont dans le cocktail
		let inCluster = true;
		//si le cluster est supérieur à 0, on séléctionne les cocktails avec TOUT les ingrédients séléctionnés
		if (cluster) {
			if (cluster.length > 0)
				inCluster = cluster.every(id => ingredientArray.includes(id));
		}
		//tous les ingrédients du cocktail sont dans l'inventaire
		const inInventory = ingredientArray.every(id => inventory.includes(id));
		return inCluster && inInventory;
	});

	//add count property for the cocktails available
	let countedIng = inventoryIng.map(ingredient => {
		return {
			...ingredient,
			count: getIngredientCount(clusterCocktails, ingredient.id),
		};
	});
	//sort by count
	let sortedIng = countedIng.sort((a, b) => b.count - a.count);
	return sortedIng.filter(ingredient => {
		const ingredientAlreadyInCluster = !cluster.includes(ingredient.id);
		const occurences = ingredient.count;
		//remove cluster ingredients and no counted ingredients
		return ingredientAlreadyInCluster && occurences;
	});
};
