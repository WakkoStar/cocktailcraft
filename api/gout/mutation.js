var _ = require('lodash');
const {
	createGout: createGoutInDb,
	modifyGout: modifyGoutInDb,
	deleteGout: deleteGoutInDb,
	getAllGouts: getGouts,
} = require('./data');

const executeRequestInDb = async (params, callback, msg, ctx) => {
	if (!ctx.user.is_admin) return 'Not admin';
	if (_.some(params, _.isUndefined)) throw new Error('empty fields');
	const gouts = await getGouts();
	const existsGout = gouts.find(gout => parseInt(gout.id) === params.id);
	if (existsGout) {
		callback({ ...params });
		return `${msg} (gout: ${existsGout.nom})`;
	} else {
		throw new Error('ID no founded');
	}
};

module.exports.createGout = async (_, { nom }, ctx) => {
	if (!ctx.user.is_admin) return 'Not admin';
	const gouts = await getGouts();
	const existsGout = gouts.find(gout => gout.nom === nom);
	if (existsGout) {
		throw new Error('Gout already exists');
	} else {
		createGoutInDb(nom);
		return `${nom} vient d'être créé avec succès`;
	}
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
