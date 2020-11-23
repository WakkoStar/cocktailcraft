const { getAllNotesByCocktailId } = require('./data');

module.exports.getNoteOfCocktail = async (_, { cocktail_id }) => {
	const notes = await getAllNotesByCocktailId(cocktail_id);
	const count = notes.length;
	const rate = notes.reduce((acc, note) => (acc += note.rate), 0) / count;

	return {
		rate,
		count,
	};
};
