const { addCocktailToHistory, updateHistory, getHistory } = require('./data');
const { updateUserExp } = require('../../users/data');
const { getCreatedCocktailsByUser } = require('../data');
const { getHelpersCocktails } = require('../../utils/finder');

module.exports.addToHistory = async (_, { cocktail_id }, ctx) => {
	return new Promise(async (resolve, reject) => {
		const cocktail = await getHelpersCocktails(cocktail_id, [true]);
		if (!cocktail.isExist) {
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

			const cocktailCreated = await getCreatedCocktailsByUser(
				ctx.user.id
			);
			const isCreator = cocktailCreated.find(
				cocktail => cocktail.id == cocktail_id
			);
			!isCreator &&
				updateUserExp(Number(ctx.user.experience) + 5, ctx.user.id);
		}

		resolve('Historique mis à jour');
	});
};
