var moment = require('moment');
const client = require('../../utils/bdd');

module.exports.getHistory = async user_id => {
	const res = await client.query(
		`SELECT cocktail_id, nom, image FROM history_cocktail hc
        JOIN cocktails c ON c.id = hc.cocktail_id
        WHERE hc.user_id = $1 ORDER BY time DESC `,
		[user_id]
	);
	return res.rows;
};

module.exports.addCocktailToHistory = async (cocktail_id, user_id) => {
	const text =
		'INSERT INTO history_cocktail (cocktail_id, user_id) VALUES ($1,$2)';
	const values = [cocktail_id, user_id];

	client.query(text, values, err => {
		if (err) throw err;
	});
};

module.exports.updateHistory = async (
	cocktail_id,
	user_id,
	new_cocktail_id
) => {
	const text =
		'UPDATE history_cocktail SET cocktail_id = $1, time = $2 WHERE cocktail_id = $3 AND user_id = $4';
	const values = [new_cocktail_id, moment().format(), cocktail_id, user_id];

	client.query(text, values, err => {
		if (err) throw err;
	});
};
