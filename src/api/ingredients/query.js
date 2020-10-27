import axios from 'axios';

const GET_ONE_INGREDIENT = `query ingredient ($id: Int!) {
    ingredient (id: $id) {
        id
        nom
        alias
		family_of
		hasFamily
    }
}`;

const GET_INGREDIENTS = `query ingredients {
    ingredients {
        id
        nom
        alias
		family_of
		hasFamily
    }
}`;

const GET_FAMILY_INGREDIENTS = `query ingredientsFamily ($family_of: [Int!]!) {
    ingredientsFamily (family_of: $family_of) {
        id
        nom
        alias
		family_of
		hasFamily
    }
}`;

export const getAllIngredients = async () => {
	const req = await axios.post(
		'http://localhost:4000',
		{
			query: GET_INGREDIENTS,
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
	const res = req.data;
	return res.data.ingredients ? res.data.ingredients : res.errors[0];
};

export const getOneIngredients = async id => {
	const req = await axios.post(
		'http://localhost:4000',
		{
			query: GET_ONE_INGREDIENT,
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
	return res.data.ingredient ? res.data.ingredient : res.errors[0];
};

export const getFamilyIngredients = async family_of => {
	const req = await axios.post(
		'http://localhost:4000',
		{
			query: GET_FAMILY_INGREDIENTS,
			variables: {
				family_of,
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
	const res = req.data;
	return res.data.ingredientsFamily
		? res.data.ingredientsFamily
		: res.errors[0];
};
