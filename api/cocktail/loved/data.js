const client = require('../../utils/bdd');

module.exports.getCocktailsLovedByUserId = async user_id => {
	const text = `SELECT cocktail_id, nom FROM loved_cocktail lc 
	JOIN cocktails c ON c.id = lc.cocktail_id
	WHERE lc.user_id = $1 AND c.is_visible = true
	ORDER BY time DESC`;
	const values = [user_id];

	const res = await client.query(text, values);

	return res.rows;
};

module.exports.addLovedCocktail = async (cocktail_id, user_id) => {
	const text =
		'INSERT INTO loved_cocktail (cocktail_id, user_id) VALUES( $1, $2)';
	const values = [cocktail_id, user_id];

	client.query(text, values, err => {
		if (err) throw err;
	});
};

module.exports.deleteLovedCocktail = async (cocktail_id, user_id) => {
	const text =
		'DELETE FROM loved_cocktail WHERE cocktail_id = $1 AND user_id = $2';
	const values = [cocktail_id, user_id];

	client.query(text, values, err => {
		if (err) throw err;
	});
};
