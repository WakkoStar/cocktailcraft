const {
	addNote: addNoteInDb,
	updateNote: updateNoteInDb,
	getAllNotesByCocktailId,
} = require('./data');
const { getHelpersCocktails } = require('../utils/finder');
const { updateUserExp } = require('../users/data');
var _ = require('lodash');

module.exports.addNote = async (__, { cocktail_id, rate }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (_.isUndefined(cocktail_id) || _.isUndefined(rate)) {
			reject('empty fields');
			return;
		}
		if (_.isNaN(parseFloat(rate)) && parseFloat(rate) > 5) {
			reject('Invalid rate');
			return;
		}
		const cocktail = await getHelpersCocktails(cocktail_id);
		if (!cocktail.isExist) {
			reject('Cocktail not found');
			return;
		}

		const notes = await getAllNotesByCocktailId(cocktail_id);
		const isUserAlreadyNoted = notes.find(
			note => note.user_id == ctx.user.id
		);

		if (!isUserAlreadyNoted) {
			addNoteInDb(ctx.user.id, cocktail_id, rate);
			updateUserExp(Number(ctx.user.experience) + 10, ctx.user.id);
		} else {
			updateNoteInDb(ctx.user.id, cocktail_id, rate);
		}

		resolve('Votre note a été ajoutée');
	});
};
