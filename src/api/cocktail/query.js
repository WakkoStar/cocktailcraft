const GET_ONE_COCKTAIL = `query cocktail ($id: Int!) {
    cocktail (id: $id) {
        id
        nom
        descriptions {
            content
            preparation
            cocktail_id
        }
        ingredients {
            ingredient_id
            volume
            nom
            cocktail_id
        }
        gout_array
        difficulty
    }
}`;

const GET_ALL_COCKTAIL = `query cocktails {
    cocktails {
        id
        nom
        descriptions {
            content
            preparation
            cocktail_id
        }
        ingredients {
            ingredient_id
            volume
            nom
            cocktail_id
        }
        gout_array
        difficulty
    }
}`;

export const getAllCocktails = async () => {
	const req = await axios.post(
		'http://localhost:4000/graphql',
		{
			query: GET_ALL_COCKTAIL,
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
	const res = req.data;
	return res.data.cocktails ? res.data.cocktails : res.errors[0];
};

export const getOneCocktails = async id => {
	const req = await axios.post(
		'http://localhost:4000/graphql',
		{
			query: GET_ONE_COCKTAIL,
			variables: {
				id,
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
	const res = req.data;
	return res.data.cocktail ? res.data.cocktail : res.errors[0];
};
