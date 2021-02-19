const client = require('../utils/bdd');
const { getHasFamily } = require('./helpers');

module.exports.getAllIngredients = async () => {
	const res = await client.query('SELECT * FROM ingredients ORDER BY nom');
	const parsedIngredients = res.rows;
	//get if they have an family
	const fullfilledIngredients = getHasFamily(parsedIngredients);
	return fullfilledIngredients;
};

module.exports.createIngredient = (nom, alias, family_of) => {
	const text =
		'INSERT INTO ingredients (nom, alias, family_of) VALUES ($1, $2, $3)';
	const values = [nom, alias, family_of];

	client.query(text, values, err => {
		if (err) throw err;
	});
};

module.exports.modifyIngredient = ({ nom, alias, family_of, id }) => {
	const text =
		'UPDATE ingredients SET nom = $1, alias=$2, family_of=$3 WHERE id = $4';
	const values = [nom, alias, family_of, id];

	client.query(text, values, err => {
		if (err) throw err;
	});
};

module.exports.deleteIngredient = ({ id }) => {
	const text = 'DELETE FROM ingredients WHERE id = $1';
	const values = [id];

	client.query(text, values, err => {
		if (err) throw err;
	});
};
