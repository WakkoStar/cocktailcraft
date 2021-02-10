var _ = require('lodash');
const fs = require('fs');
const {
	createCocktail: createCocktailInDb,
	modifyCocktail: modifyCocktailInDb,
	deleteCocktail: deleteCocktailInDb,
	setVisibility: setVisibilityInDb,
	modifyCocktailImage,
} = require('./data');

const { addNotifications } = require('../notifications/data');
const { updateUserExp, updateCocktailCreatedInDay } = require('../users/data');
const {
	isValidDifficulty,
	isValidName,
	isValidGouts,
	uploadFile,
} = require('./helpers');

const { getHelpersCocktails } = require('../utils/finder');

const executeRequestInDb = async (params, callback, msg, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!ctx.user.is_admin) {
			reject('Not admin');
			return;
		}
		//execute callback
		if (_.some(params, _.isUndefined)) {
			reject('empty fields');
			return;
		}
		const cocktail = await getHelpersCocktails(params.id, [true, false]);
		if (cocktail.isExist) {
			callback({ ...params });
			resolve(`${msg} (cocktail: ${cocktail.nom})`);
		} else {
			reject('ID no founded');
		}
	});
};

module.exports.createCocktail = async (
	_,
	{ nom, gout_array, difficulty, file },
	ctx
) => {
	return new Promise(async (resolve, reject) => {
		// 	//Check fields

		if (!nom || !gout_array || !difficulty) {
			reject('empty fields');
			return;
		}

		if (
			!isValidDifficulty(difficulty) ||
			!isValidName(nom) ||
			!isValidGouts(gout_array)
		) {
			reject('Invalid fields');
			return;
		}

		//Create cocktail if isn't already created
		const cocktail = await getHelpersCocktails(null, [true, false], nom);
		if (cocktail.isExist || ctx.user.cocktail_created_in_day >= 10) {
			reject("Cocktail already exists or you can't create new cocktail");
			return;
		} else {
			const getId = await createCocktailInDb(
				nom.trim(),
				gout_array,
				difficulty,
				ctx.user.id
			);
			updateCocktailCreatedInDay(
				Number(ctx.user.cocktail_created_in_day) + 1,
				ctx.user.id
			);
			updateUserExp(Number(ctx.user.experience) + 100, ctx.user.id);
			addNotifications({
				message: `Votre cocktail "${nom}" a été soumis, nous traitons votre demande...`,
				user_id: ctx.user.id,
			});

			if (file != null) {
				file.then(async ({ createReadStream }) => {
					const filename = `${nom.trim()}.jpg`;
					uploadFile(createReadStream, filename).then(result => {
						modifyCocktailImage(filename, getId);
					});
				});
			}

			resolve(`${getId}`);
		}
	});
};

module.exports.modifyCocktail = async (
	_,
	{ nom, gout_array, difficulty, file, id },
	ctx
) => {
	return new Promise(async (resolve, reject) => {
		const cocktail = await getHelpersCocktails(null, [true, false], nom);
		if (cocktail.isExist || cocktail.id != id) {
			reject("Cocktail already exists or you can't create new cocktail");
			return;
		}
		if (file != null) {
			file.then(async ({ createReadStream }) => {
				const filename = `${nom.trim()}.jpg`;

				const src = 'assets/' + filename;
				if (fs.existsSync(src)) fs.unlinkSync(src);

				uploadFile(createReadStream, filename).then(result => {
					modifyCocktailImage(filename, id);
				});
			});
		}
		const msg = await executeRequestInDb(
			{ nom, gout_array, difficulty, id },
			modifyCocktailInDb,
			`Le cocktail vient d'être modifié avec succès`,
			ctx
		);
		resolve(msg);
	});
};

module.exports.deleteCocktail = async (_, { id }, ctx) => {
	const cocktail = await getHelpersCocktails(id, [true, false]);

	const src = 'assets/' + cocktail.image;
	if (fs.existsSync(src)) fs.unlinkSync(src);

	return await executeRequestInDb(
		{ id },
		deleteCocktailInDb,
		`Le cocktail vient d'être supprimé avec succès`,
		ctx
	);
};

module.exports.setVisibility = async (_, { is_visible, id }, ctx) => {
	return await executeRequestInDb(
		{ is_visible, id },
		setVisibilityInDb,
		`Le cocktail vient de changer de vue avec succès`,
		ctx
	);
};
