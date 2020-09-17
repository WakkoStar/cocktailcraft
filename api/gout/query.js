const { getAllGouts: getGouts } = require('./data');

module.exports.getAllGouts = async () => {
	const gouts = await getGouts();
	return gouts;
};

module.exports.getOneGouts = async (_, { id }) => {
	const gouts = await getGouts();
	const gout = gouts.filter(gout => gout.id == id)[0];

	if (gout) {
		return gout;
	} else {
		throw new Error('Gout no founded');
	}
};
