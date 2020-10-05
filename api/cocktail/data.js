var _ = require('lodash');
const client = require('../utils/bdd');

module.exports.getAllCocktails = async () => {
	const resIngredients = await client.query(
		`SELECT ic.id AS ic_id, ic.ingredient_id, i.nom, ic.volume, id_cocktail FROM cocktails c 
		FULL JOIN ingredient_cocktail ic ON c.id = ic.id_cocktail 
		FULL JOIN ingredients i ON i.id = ic.ingredient_id ORDER BY c.nom`
	);

	const resDescriptions = await client.query(
		`SELECT dc.id as dc_id, content, preparation, id_cocktail FROM cocktails c 
		FULL JOIN description_cocktail dc ON c.id = dc.id_cocktail ORDER BY c.nom`
	);

	const cocktails = await getDescriptionsAndIngredientsOfCocktails(
		_.concat(resDescriptions.rows, resIngredients.rows)
	);
	return cocktails;
};

module.exports.getAllIngredients = async () => {
	const res = await client.query('SELECT * FROM ingredient_cocktail');
	return res.rows;
};

module.exports.getAllDescriptions = async () => {
	const res = await client.query('SELECT * FROM description_cocktail');
	return res.rows;
};

const getDescriptionsAndIngredientsOfCocktails = async cocktails => {
	const res = await client.query('SELECT * FROM cocktails');
	const distinctCocktails = res.rows;

	const fullfilledCocktails = distinctCocktails.map(el => {
		//selection des lignes a aggreger
		const cocktailArray = cocktails.filter(
			({ id_cocktail }) => id_cocktail === el.id
		);
		//aggreger les lignes en un objet
		return cocktailArray.reduce(
			(cocktailFull, cocktailPart) => {
				//{id,nom,description,ingredient}
				const { content, preparation, dc_id } = cocktailPart;
				const { ingredient_id, nom, volume, ic_id } = cocktailPart;
				return {
					...cocktailFull,
					descriptions: content
						? _.concat(cocktailFull.descriptions, {
								id: dc_id,
								content,
								preparation,
								cocktail_id: el.id,
						  })
						: cocktailFull.descriptions,
					ingredients: ingredient_id
						? _.concat(cocktailFull.ingredients, {
								id: ic_id,
								ingredient_id,
								nom,
								volume,
								cocktail_id: el.id,
						  })
						: cocktailFull.ingredients,
				};
			},
			{ ...el, descriptions: [], ingredients: [] }
		);
	});

	return fullfilledCocktails;
};

module.exports.createCocktail = (nom, gout_array, difficulty) => {
	const text =
		'INSERT INTO cocktails (nom, gout_array, difficulty) VALUES ($1,$2,$3)';
	const values = [nom, gout_array, difficulty];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
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

module.exports.modifyCocktail = ({ nom, gout_array, difficulty, id }) => {
	const text =
		'UPDATE cocktails SET nom = $1, gout_array = $2, difficulty = $3 WHERE id = $4';
	const values = [nom, gout_array, difficulty, id];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.updateIngredientOfCocktail = ({ input: ingredient, id }) => {
	const { ingredient_id, volume, id_cocktail } = ingredient;
	const text =
		'UPDATE ingredient_cocktail SET ingredient_id = $1, volume = $2, id_cocktail = $3 WHERE id = $4';
	const values = [ingredient_id, volume, id_cocktail, id];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.updateDescriptionOfCocktail = ({ input: description, id }) => {
	const { content, preparation, id_cocktail } = description;
	const text =
		'UPDATE description_cocktail SET content = $1, preparation = $2, id_cocktail = $3 WHERE id = $4';
	const values = [content, preparation, id_cocktail, id];

	client.query(text, values, (err, res) => {
		if (err) throw err;
	});
};

module.exports.deleteOfCocktail = ({ id, db }) => {
	const text = `DELETE FROM ${db} WHERE id_cocktail = $1`;
	const values = [id];

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

/*
    schéma : 
    {
        id: 1,
        nom: mojito,
        descriptions: [
            {
                content: "Mettre la menthe....",
                preparation : "Fait directement au verre"
            },
        ],
        ingredients: [
            {
				ingredient_id : 1,
				nom : "Angostura"
                volume: "un trait"
            },
            {
				ingredient_id: 3,
				nom : "Sucre"
                volume: "20 grammes"
            }
        ],
        gout_array: [1, 2, 4, 8],
        difficulty: "Facile"
    }
*/
