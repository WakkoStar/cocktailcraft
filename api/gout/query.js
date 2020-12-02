const { getAllGouts: getGouts } = require('./data');

module.exports.getAllGouts = async () => {
	const gouts = await getGouts();
	return gouts;
};

module.exports.getOneGouts = async (_, { id }) => {
	return new Promise(async (resolve, reject) => {
		const gouts = await getGouts();
		const gout = gouts.filter(gout => parseInt(gout.id) === id)[0];

		if (!gout) reject('Gout no founded');
		resolve(gout);
	});
};
