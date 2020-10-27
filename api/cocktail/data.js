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

module.exports.createCocktail = async (nom, gout_array, difficulty) => {
	const text =
		'INSERT INTO cocktails (nom, gout_array, difficulty) VALUES ($1,$2,$3) RETURNING id';
	const values = [nom, gout_array, difficulty];

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
