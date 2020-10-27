var _ = require('lodash');
const client = require('../../utils/bdd');

module.exports.getAllIngredients = async () => {
	const res = await client.query('SELECT * FROM ingredient_cocktail');
	return res.rows;
};

module.exports.getAllDescriptions = async () => {
	const res = await client.query('SELECT * FROM description_cocktail');
	return res.rows;
};

module.exports.createDescriptionsOfCocktail = ({ input: description }) => {
	const { content, preparation, id_cocktail } = description;
	const text =
		'INSERT INTO description_cocktail (content, preparation, id_cocktail) VALUES ($1,$2,$3)';
	const values = [content, preparation, id_cocktail];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.createIngredientOfCocktail = ({ input: ingredient }) => {
	const { ingredient_id, volume, id_cocktail } = ingredient;
	const text =
		'INSERT INTO ingredient_cocktail (ingredient_id, volume, id_cocktail) VALUES ($1,$2,$3)';
	const values = [ingredient_id, volume, id_cocktail];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.updateIngredientOfCocktail = ({ input: ingredient }) => {
	const { ingredient_id, volume, id_cocktail } = ingredient;
	const text =
		'UPDATE ingredient_cocktail SET volume = $1 WHERE ingredient_id = $2 AND id_cocktail = $3';
	const values = [volume, ingredient_id, id_cocktail];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.updateDescriptionOfCocktail = ({ input: description }) => {
	const { content, preparation, id_cocktail } = description;
	const text =
		'UPDATE description_cocktail SET content = $1 WHERE preparation = $2 AND id_cocktail = $3';
	const values = [content, preparation, id_cocktail];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.deleteIngredientOfCocktail = ({ input: ingredient }) => {
	const { ingredient_id, id_cocktail } = ingredient;
	const text = `DELETE FROM ingredient_cocktail  WHERE ingredient_id = $1 AND id_cocktail = $2`;
	const values = [ingredient_id, id_cocktail];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.deleteDescriptionOfCocktail = ({ input: description }) => {
	const { preparation, id_cocktail } = description;
	const text = `DELETE FROM description_cocktail WHERE preparation = $1 AND id_cocktail = $2`;
	const values = [preparation, id_cocktail];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};
