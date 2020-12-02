const {
	getAllCocktails: getCocktails,
	getCreatedCocktailByUser,
} = require('./data');

module.exports.getAllCocktails = async (_, { is_visible }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!is_visible && !ctx.user.is_admin) reject('Not admin');
		const cocktails = await getCocktails(is_visible);
		resolve(cocktails);
	});
};

module.exports.getOneCocktails = async (_, { id, is_visible }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!is_visible && !ctx.user.is_admin) reject('Not admin');
		const cocktails = await getCocktails(is_visible);
		const cocktailFinded = cocktails.filter(
			cocktail => parseInt(cocktail.id) === id
		)[0];
		if (!cocktailFinded) reject('cocktail no founded');
		resolve(cocktailFinded);
	});
};

module.exports.getAvailableCocktails = async (_, { ingredient_array }) => {
	const cocktails = await getCocktails(true);
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

module.exports.getCraftedCocktails = async (_, { cluster }) => {
	//cluster : [ingredient.id]
	const cocktails = await getCocktails(true);
	const createdCocktails = cocktails.filter(({ ingredients }) => {
		const ingredientArray = ingredients.map(({ ingredient_id }) =>
			parseInt(ingredient_id)
		);
		const inCocktail = ingredientArray.every(id => cluster.includes(id));
		const inCluster = cluster.every(id => ingredientArray.includes(id));

		return inCocktail && inCluster;
	});
	return createdCocktails;
};

module.exports.getCreatedCocktailsByUser = async (_, {}, ctx) => {
	const cocktails = await getCreatedCocktailByUser(ctx.user.id);
	return cocktails;
};
