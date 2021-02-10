var _ = require('lodash');
const client = require('../utils/bdd');

const {
	concatElementsIntoCocktails,
	getElementsOfCocktail,
} = require('./helpers');

module.exports.getAllCocktails = async (is_visible = true) => {
	const resIngredients = await client.query(
		`SELECT ic.id AS el_id, ic.ingredient_id, i.nom, ic.volume, id_cocktail FROM cocktails c 
		FULL JOIN ingredient_cocktail ic ON c.id = ic.id_cocktail 
		FULL JOIN ingredients i ON i.id = ic.ingredient_id
		ORDER BY volume`
	);

	const resDescriptions = await client.query(
		`SELECT dc.id as el_id, content, preparation, id_cocktail FROM cocktails c 
		FULL JOIN description_cocktail dc ON c.id = dc.id_cocktail
		 ORDER BY preparation
		`
	);

	const resCocktails = await client.query(
		`SELECT c.id, c.nom, c.gout_array, c.difficulty, c.user_id, u.username, c.image FROM cocktails c 
		FULL JOIN users u ON u.id = c.user_id
		WHERE is_visible = $1 
		ORDER BY creation_date
		`,
		[is_visible]
	);
	const cocktails = resCocktails.rows;

	const descriptions = await getElementsOfCocktail(
		cocktails,
		resDescriptions.rows,
		'descriptions'
	);
	const ingredients = await getElementsOfCocktail(
		cocktails,
		resIngredients.rows,
		'ingredients'
	);
	return concatElementsIntoCocktails(cocktails, descriptions, ingredients);
};

module.exports.getCreatedCocktailByUser = async id => {
	const text =
		'SELECT * FROM cocktails WHERE user_id = $1 AND is_visible = true ORDER BY creation_date DESC';
	const values = [id];
	const res = await client.query(text, values);
	return res.rows;
};

module.exports.createCocktail = async (
	nom,
	gout_array,
	difficulty,
	user_id
) => {
	const text =
		'INSERT INTO cocktails (nom, gout_array, difficulty, user_id) VALUES ($1,$2,$3,$4) RETURNING id';
	const values = [nom, gout_array, difficulty, user_id];

	const res = await client.query(text, values);
	return res.rows[0].id;
};

module.exports.modifyCocktail = ({ nom, gout_array, difficulty, id }) => {
	const text =
		'UPDATE cocktails SET nom = $1, gout_array = $2, difficulty = $3 WHERE id = $4';
	const values = [nom, gout_array, difficulty, id];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.modifyCocktailImage = (image, id) => {
	const text = 'UPDATE cocktails SET image = $1 WHERE id = $2';
	const values = [image, id];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.setVisibility = ({ is_visible, id }) => {
	const text = 'UPDATE cocktails SET is_visible = $1 WHERE id = $2';
	const values = [is_visible, id];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.deleteCocktail = ({ id }) => {
	const text = `DELETE FROM cocktails WHERE id = $1`;
	const values = [id];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};
