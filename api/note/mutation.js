const { addNote: addNoteInDb, updateNote: updateNoteInDb } = require('./data');
var _ = require('lodash');

module.exports.addNote = (_, { cocktail_id, rate }, ctx) => {
	if (_.isUndefined(cocktail_id) || _.isUndefined(rate)) {
		throw new Error('empty fields');
	}
	addNoteInDb(ctx.user.id, cocktail_id, rate);
	return 'Votre note a été ajoutée';
};

module.exports.updateNote = (_, { cocktail_id, rate }, ctx) => {
	if (_.isUndefined(cocktail_id) || _.isUndefined(rate)) {
		throw new Error('empty fields');
	}
	updateNoteInDb(ctx.user.id, cocktail_id, rate);
	return 'Votre note a été ajoutée';
};
