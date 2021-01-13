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

module.exports.isValidDifficulty = difficulty => {
	const difficulties = ['Très facile', 'Facile', 'Moyen', 'Difficile'];
	return difficulties.includes(difficulty);
};

module.exports.isValidPreparation = preparation => {
	const preparations = ['Directement dans le verre', 'Au shaker'];

	return preparations.includes(preparation);
};

module.exports.isValidDescription = description => {
	if (description.length > 2000 || description.length < 10) return false;
	if (description.match(new RegExp(`[^ -~à-ÿ]`))) return false;

	return true;
};

module.exports.isValidVolume = volume => {
	const volumes = [
		'mL',
		'cL',
		'Litre(s)',
		'demi(e)',
		'quart',
		'gramme(s)',
		'trait(s)',
		'cuil. à café',
		'cuil. à soupe',
		'verre(s) à liqueur',
		'mug(s)',
		'morceau(x)',
		'boule(s)',
		'tranche(s)',
		'demi-tranche(s)',
		'boite(s)',
		'Aucune unité',
	];

	const isValidUnit = volumes.some(el => volume.includes(el));

	const number = volume.replace(/^\D+/g, '');
	const isValidNumber =
		typeof parseInt(number) === 'number' &&
		parseInt(number) > 0 &&
		parseInt(number) <= 1000;

	return isValidNumber && isValidUnit;
};

module.exports.isValidName = nom => {
	if (
		nom.length < 2 ||
		nom.length > 25 ||
		nom.match(new RegExp(`[^a-zA-Z0-9à-ÿ ]`))
	)
		return false;

	return true;
};

module.exports.isValidGouts = gout_array => {
	if (gout_array.length < 1 || gout_array.length > 5) return false;
	if (gout_array.some(({ gout }) => typeof parseInt(gout) != 'number'))
		return false;

	return true;
};
