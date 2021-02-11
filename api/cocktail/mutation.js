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
const { reject } = require('lodash');

module.exports.createCocktail = async (
	__,
	{ nom, gout_array, difficulty, file },
	ctx
) => {
	return new Promise(async (resolve, reject) => {
		//Check fields
		if (_.isNil(nom) || _.isNil(gout_array) || _.isNil(difficulty)) {
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

			if (!_.isNil(file)) {
				file.then(async ({ createReadStream }) => {
					const filename = `${nom.trim()}.jpg`;
					uploadFile(createReadStream, filename).then(() => {
						modifyCocktailImage(filename, getId);
					});
				});
			}

			resolve(`${getId}`);
		}
	});
};

const executeRequestInDb = async (params, callback) => {
	//execute callback
	if (_.some(params, _.isNil)) {
		return false;
	}
	const cocktail = await getHelpersCocktails(params.id, [true, false]);
	if (cocktail.isExist) {
		callback({ ...params });
		return true;
	} else {
		return false;
	}
};

module.exports.modifyCocktail = async (
	__,
	{ nom, gout_array, difficulty, file, id },
	ctx
) => {
	return new Promise(async (resolve, reject) => {
		if (!ctx.user.is_admin) {
			reject('Not admin');
			return;
		}

		const isSucceed = await executeRequestInDb(
			{ nom, gout_array, difficulty, id },
			modifyCocktailInDb
		);

		if (isSucceed) {
			if (!_.isNil(file)) {
				file.then(async ({ createReadStream }) => {
					const filename = `${nom.trim()}.jpg`;

					const src = 'assets/' + filename;
					if (fs.existsSync(src)) fs.unlinkSync(src);

					uploadFile(createReadStream, filename).then(result => {
						modifyCocktailImage(filename, id);
					});
				});
			}
			resolve('Cocktail modified');
		} else {
			reject('Cocktail not modified');
		}
	});
};

module.exports.deleteCocktail = async (_, { id }, ctx) => {
	return new Promise(async (resolve, reject) => {
		if (!ctx.user.is_admin) {
			reject('Not admin');
			return;
		}
		const isSucceed = await executeRequestInDb({ id }, deleteCocktailInDb);

		if (isSucceed) {
			const cocktail = await getHelpersCocktails(id, [true, false]);

			const src = 'assets/' + cocktail.image;
			if (fs.existsSync(src)) fs.unlinkSync(src);

			resolve('Cocktail deleted');
		} else {
			reject('Cocktail not deleted');
		}
	});
};

module.exports.setVisibility = async (_, { is_visible, id }, ctx) => {
	if (!ctx.user.is_admin) {
		reject('Not admin');
		return;
	}
	return await executeRequestInDb({ is_visible, id }, setVisibilityInDb);
};
