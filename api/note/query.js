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
		const count = notes.length;
		const rate = notes.reduce((acc, note) => (acc += note.rate), 0) / count;
		resolve({
			rate,
			count,
		});
	});
};
