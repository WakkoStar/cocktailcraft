const { getCocktailsLovedByUserId } = require('./data');

module.exports.getCocktailsLoved = async (_, {}, ctx) => {
	const cocktails = await getCocktailsLovedByUserId(ctx.user.id);
	return cocktails.map(cocktail => {
		return { ...cocktail, id: cocktail.cocktail_id };
	});
};
