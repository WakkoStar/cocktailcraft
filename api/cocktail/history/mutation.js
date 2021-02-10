const { addCocktailToHistory, updateHistory, getHistory } = require('./data');
const {
	updateCocktailCrafted,
	getUser,
	updateUserExp,
} = require('../../users/data');
const { getCreatedCocktailByUser, getAllCocktails } = require('../data');

module.exports.addToHistory = async (_, { cocktail_id }, ctx) => {
	return new Promise(async (resolve, reject) => {
		const cocktails = await getAllCocktails(true);

		if (!cocktails.find(cocktail => cocktail.id == cocktail_id)) {
			reject('Cocktail not found');
			return;
		}

		const history = await getHistory(ctx.user.id);

		const isCocktailAlreadySeen = history.find(
			el => parseInt(el.cocktail_id) == parseInt(cocktail_id)
		);
		if (isCocktailAlreadySeen != undefined) {
			updateHistory(cocktail_id, ctx.user.id, cocktail_id);
		} else {
			if (history.length >= 20) {
				const lastEl = history.pop();
				updateHistory(lastEl.cocktail_id, ctx.user.id, cocktail_id);
			} else {
				addCocktailToHistory(cocktail_id, ctx.user.id);
			}

			const user = await getUser(ctx.user.id);
			updateCocktailCrafted(
				Number(user.cocktail_crafted_count) + 1,
				ctx.user.id
			);

			const cocktailCreated = await getCreatedCocktailByUser(ctx.user.id);
			const isCreator = cocktailCreated.find(
				cocktail => cocktail.id == cocktail_id
			);
			!isCreator &&
				updateUserExp(Number(ctx.user.experience) + 5, ctx.user.id);
		}

		resolve('Historique mis à jour');
	});
};
