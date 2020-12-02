const { getAllNotesByCocktailId } = require('./data');
const { getAllCocktails } = require('../cocktail/data');
var _ = require('lodash');
module.exports.getNoteOfCocktail = async (__, { cocktail_id }) => {
	return new Promise(async (resolve, reject) => {
		const cocktails = await getAllCocktails();
		if (
			_.isUndefined(cocktails.find(c => parseInt(c.id) === cocktail_id))
		) {
			reject('Cocktail not found');
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
