const { getOneGouts, getAllGouts } = require('./query');
const { createGout, modifyGout, deleteGout } = require('./mutation');
module.exports.schema = `
    type Gouts {
        id: Int
        nom: String
    }
`;

module.exports.resolvers = {
	gout: getOneGouts,
	gouts: getAllGouts,
	createGout,
	modifyGout,
	deleteGout,
};
