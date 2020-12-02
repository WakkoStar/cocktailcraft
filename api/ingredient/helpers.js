module.exports.getHasFamily = ingredients => {
	let families_of = ingredients.map(({ family_of }) => family_of);
	return ingredients.map(ingredient => {
		const hasFamily = families_of.some(family_of => {
			return family_of.includes(ingredient.id);
		});
		return { ...ingredient, hasFamily };
	});
};

//count amount of ingredients
module.exports.getIngredientCount = (res, id) => {
	let filteredCocktails = res.filter(({ ingredients }) => {
		const ingredientArray = ingredients.map(({ ingredient_id }) =>
			parseInt(ingredient_id)
		);
		return ingredientArray.includes(parseInt(id));
	});
	return filteredCocktails.length;
};
