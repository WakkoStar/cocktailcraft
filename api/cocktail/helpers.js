var _ = require('lodash');

module.exports.concatElementsIntoCocktails = (
	cocktails,
	cocktailDescriptions,
	cocktailIngredients
) => {
	return cocktails.map(cocktail => {
		const elementIngredient = cocktailIngredients.find(
			el => el.id === cocktail.id
		);
		const elementDesc = cocktailDescriptions.find(
			el => el.id === cocktail.id
		);
		return {
			...cocktail,
			ingredients: elementIngredient.ingredients,
			descriptions: elementDesc.descriptions,
		};
	});
};

module.exports.getElementsOfCocktail = async (
	cocktails,
	elementsCocktail,
	key
) => {
	const fullfilledCocktails = cocktails.map(({ id }) => {
		const elementsForOneCocktail = elementsCocktail.filter(
			({ id_cocktail }) => id_cocktail === id
		);

		return elementsForOneCocktail.reduce(
			(cocktails, element) => {
				return {
					...cocktails,
					[key]: _.concat(cocktails[key], {
						...element,
						id: element.el_id,
					}),
				};
			},
			{ id, [key]: [] }
		);
	});

	return fullfilledCocktails;
};
