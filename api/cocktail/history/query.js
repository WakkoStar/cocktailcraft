const { getHistory: getHistoryInDb } = require('./data');

module.exports.getHistory = async (_, {}, ctx) => {
	return new Promise(async resolve => {
		const cocktails = await getHistoryInDb(ctx.user.id);
		resolve(
			cocktails.map(({ cocktail_id, nom }) => {
				return { id: cocktail_id, nom };
			})
		);
	});
};
