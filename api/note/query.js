const { getAllNotesByCocktailId } = require('./data');
const { getHelpersCocktails } = require('../utils/finder');

module.exports.getNoteOfCocktail = async (__, { cocktail_id }) => {
	return new Promise(async (resolve, reject) => {
		const cocktail = await getHelpersCocktails(cocktail_id, [true]);
		if (!cocktail.isExist) {
			reject('Cocktail not found');
			return;
		}
		const notes = await getAllNotesByCocktailId(cocktail_id);
		if (!notes.length) {
			resolve({
				rate: 0,
				count: 0,
			});
		}
		const count = notes.length;
		const rate = parseFloat(
			notes.reduce((acc, note) => (acc += note.rate), 0) / count
		).toFixed(1);
		resolve({
			rate,
			count,
		});
	});
};
