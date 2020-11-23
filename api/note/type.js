const { addNote, updateNote } = require('./mutation');
const { getNoteOfCocktail } = require('./query');
module.exports.schema = `
    type Note {
        rate: Int
        count: Int
    }
`;

module.exports.resolvers = {
	addNote,
	updateNote,
	cocktailNote: getNoteOfCocktail,
};
