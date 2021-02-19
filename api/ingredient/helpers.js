module.exports.getHasFamily = ingredients => {
	let families_of = ingredients.map(({ family_of }) => family_of);
	return ingredients.map(ingredient => {
		const hasFamily = families_of.some(family_of => {
			return family_of.includes(ingredient.id);
		});
		return { ...ingredient, hasFamily };
	});
};

module.exports.getIngredientCount = (cocktails, id, family_of) => {
	let filteredCocktails = cocktails.filter(({ ingredients }) => {
		const ingredientArray = ingredients.map(({ ingredient_id }) =>
			parseInt(ingredient_id)
		);
		return (
			ingredientArray.includes(parseInt(id)) ||
			family_of.some(element =>
				ingredientArray.includes(parseInt(element))
			)
		);
	});
	return filteredCocktails.length;
};
