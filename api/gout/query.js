const { getAllGouts: getGouts } = require('./data');

module.exports.getAllGouts = async () => {
	const gouts = await getGouts();
	return gouts;
};

module.exports.getOneGouts = async (_, { id }) => {
	const gouts = await getGouts();
	const gout = gouts.filter(gout => parseInt(gout.id) === id)[0];

	if (!gout) throw new Error('Gout no founded');
	return gout;
};
