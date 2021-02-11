var _ = require('lodash');
var fs = require('fs');
var path = require('path');
const { async: mime } = require('mime-kind');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
var { promisify } = require('util');
var sizeOf = promisify(require('image-size'));

module.exports.concatElementsIntoCocktails = (
	cocktails,
	cocktailDescriptions,
	cocktailIngredients
) => {
	return cocktails.map(cocktail => {
		const elementIngredient = cocktailIngredients.find(
			el => el.id === cocktail.id
		);
		const elementDesc = cocktailDescriptions.find(
			el => el.id === cocktail.id
		);

		const fullfilledCocktails = {
			...cocktail,
			ingredients: elementIngredient.ingredients,
			descriptions: elementDesc.descriptions,
		};

		return fullfilledCocktails;
	});
};

module.exports.getElementsOfCocktail = async (
	cocktails,
	elementsCocktail,
	key
) => {
	const fullfilledCocktails = cocktails.map(({ id }) => {
		const elementsForOneCocktail = elementsCocktail.filter(
			({ id_cocktail }) => id_cocktail === id
		);

		return elementsForOneCocktail.reduce(
			(cocktails, element) => {
				return {
					...cocktails,
					[key]: _.concat(cocktails[key], {
						...element,
						id: element.el_id,
					}),
				};
			},
			{ id, [key]: [] }
		);
	});

	return fullfilledCocktails;
};

module.exports.isValidDifficulty = difficulty => {
	const difficulties = ['Très facile', 'Facile', 'Moyen', 'Difficile'];
	return !!difficulties.includes(difficulty);
};

module.exports.isValidPreparation = preparation => {
	const preparations = ['Directement dans le verre', 'Au shaker'];

	return !!preparations.includes(preparation);
};

module.exports.isValidDescription = description => {
	if (description.length > 2000 || description.length < 10) return false;
	if (description.match(new RegExp(`[^ -~à-ÿ∰∎≹]`))) return false;

	return true;
};

module.exports.isValidVolume = volume => {
	const volumes = [
		'mL',
		'cL',
		'Litre(s)',
		'demi(e)',
		'quart',
		'gramme(s)',
		'trait(s)',
		'cuil. à café',
		'cuil. à soupe',
		'verre(s) à liqueur',
		'mug(s)',
		'morceau(x)',
		'boule(s)',
		'tranche(s)',
		'demi-tranche(s)',
		'boite(s)',
		'Aucune unité',
	];

	const isValidUnit = volumes.some(el => volume.includes(el));

	const number = volume.replace(/^\D+/g, '');
	const isValidNumber =
		typeof parseInt(number) === 'number' &&
		parseInt(number) > 0 &&
		parseInt(number) <= 1000;

	return isValidNumber && isValidUnit;
};

module.exports.isValidName = nom => {
	if (
		nom.length < 2 ||
		nom.length > 25 ||
		nom.match(new RegExp(`[^a-zA-Z0-9à-ÿ ]`))
	)
		return false;

	return true;
};

module.exports.isValidGouts = gout_array => {
	if (gout_array.length < 1 || gout_array.length > 5) return false;
	if (gout_array.some(({ gout }) => typeof parseInt(gout) != 'number'))
		return false;

	return true;
};

module.exports.uploadFile = (createReadStream, filename) => {
	return new Promise(async (resolve, reject) => {
		const tempFileCompress = path.join('tmp/to_compress/', filename);
		const tempFileCrop = path.join('tmp/to_crop/', filename);
		const pathFile = path.join('assets/', filename);

		const myReadable = createReadStream();

		const type = await mime(myReadable);
		if (type.ext !== 'jpg' && type.ext !== 'png') {
			reject('Error on type : ' + type.ext);
			return;
		}

		const isFileExist = fs.existsSync(pathFile);
		if (isFileExist) {
			reject('File already exists');
			return;
		}

		const myWritable = fs.createWriteStream(tempFileCompress);

		const handleError = () => {
			console.log('Error ocurred while piping, closing all streams.');
			myReadable.destroy();
			myWritable.end();
			reject('error');
		};

		let totalLength = 0;
		myReadable
			.on('data', chunk => {
				totalLength += chunk.length;
				if (totalLength > 3000000) {
					handleError();
					fs.unlinkSync(tempFile);
					reject('File too large');
					return;
				}
			})
			.on('error', handleError)
			.pipe(myWritable)
			.on('error', handleError)
			.on('finish', async () => {
				imagemin(['tmp/to_compress/' + filename], {
					destination: 'tmp/to_crop',
					plugins: [
						imageminMozjpeg({
							maxMemory: 1000,
						}),
					],
				}).then(async () => {
					//crop file
					const dimensions = await sizeOf(tempFileCrop);
					const isWidthMinSize = dimensions.height > dimensions.width;
					const minSize = isWidthMinSize
						? dimensions.width
						: dimensions.height;
					sharp(tempFileCrop)
						.resize(minSize, minSize)
						.withMetadata()
						.toFile(pathFile)
						//delete file
						.then(() => {
							fs.unlinkSync(tempFileCrop);
							fs.unlinkSync(tempFileCompress);
						});
				});
				resolve('finished');
			});
	});
};
