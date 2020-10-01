const { getAllCocktails: getCocktails } = require('./data');

module.exports.getAllCocktails = async () => {
	const cocktails = await getCocktails();
	return cocktails;
};

module.exports.getOneCocktails = async (_, { id }) => {
	const cocktails = await getCocktails();
	return cocktails.filter(cocktail => parseInt(cocktail.id) === id)[0];
};

module.exports.getAvailableCocktails = async (_, { ingredient_array }) => {
	const cocktails = await getCocktails();
	const availCocktails = cocktails.filter(
		//For each cocktail
		cocktail => {
			//check if all ingredients of the cocktail
			return cocktail.ingredients.every(({ ingredient_id }) => {
				//is included within the parameter
				return ingredient_array.includes(parseInt(ingredient_id));
			});
		}
	);
	return availCocktails;
};

module.exports.getCreatedCocktails = async (_, { cluster }) => {
	//cluster : [ingredient.id]
	const cocktails = await getCocktails();
	const createdCocktails = cocktails.filter(({ ingredients }) => {
		const ingredientArray = ingredients.map(
			({ ingredient_id }) => ingredient_id
		);

		const inCocktail = ingredientArray.every(id => cluster.includes(id));
		const inCluster = cluster.every(id => ingredientArray.includes(id));

		return inCocktail && inCluster;
	});
	return createdCocktails;
};
