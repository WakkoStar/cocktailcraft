var _ = require('lodash');
const {
	createGout: createGoutInDb,
	modifyGout: modifyGoutInDb,
	deleteGout: deleteGoutInDb,
	getAllGouts: getGouts,
} = require('./data');

const executeRequestInDb = async (params, callback, msg, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!ctx.user.is_admin) reject('Not admin');
		if (_.some(params, _.isUndefined)) reject('empty fields');
		const gouts = await getGouts();
		const existsGout = gouts.find(gout => parseInt(gout.id) === params.id);
		if (existsGout) {
			callback({ ...params });
			resolve(`${msg} (gout: ${existsGout.nom})`);
		} else {
			reject('ID no founded');
		}
	});
};

module.exports.createGout = async (_, { nom }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!ctx.user.is_admin) reject('Not admin');
		const gouts = await getGouts();
		const existsGout = gouts.find(gout => gout.nom === nom);
		if (existsGout) {
			reject('Gout already exists');
		} else {
			createGoutInDb(nom);
			resolve(`${nom} vient d'être créé avec succès`);
		}
	});
};

module.exports.modifyGout = async (_, { nom, id }, ctx) => {
	return await executeRequestInDb(
		{ nom, id },
		modifyGoutInDb,
		"Le goût vient d'être modifié avec succès",
		ctx
	);
};

module.exports.deleteGout = async (_, { id }, ctx) => {
	return await executeRequestInDb(
		{ id },
		deleteGoutInDb,
		"Le goût vient d'être supprimé avec succès",
		ctx
	);
};
