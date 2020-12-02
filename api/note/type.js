const { addNote } = require('./mutation');
const { getNoteOfCocktail } = require('./query');
module.exports.schema = `
    type Note {
        rate: Float
        count: Int
    }
`;

module.exports.resolvers = {
	addNote,
	cocktailNote: getNoteOfCocktail,
};
