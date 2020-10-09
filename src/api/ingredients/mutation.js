import axios from 'axios';

const CREATE_INGREDIENT = `mutation createIngredient ($nom: String!, $alias: [String], $family_of: [Int]) {
    createIngredient (nom: $nom, alias: $alias, family_of: $family_of)
}`;

const MODIFY_INGREDIENT = `mutation modifyIngredient ($nom: String!, $alias: [String], $family_of: [Int], $id: Int!) {
    modifyIngredient (nom: $nom, alias: $alias, family_of: $family_of, id: $id)
}`;

const DELETE_INGREDIENT = `mutation deleteIngredient ($id: Int!) {
    deleteIngredient (id: $id)
}`;

export const createIngredient = async (nom, alias, family_of) => {
	const req = await axios.post(
		'http://localhost:4000',
		{
			query: CREATE_INGREDIENT,
			variables: {
				nom,
				alias,
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
	return res.data.createIngredient
		? res.data.createIngredient
		: res.errors[0];
};

export const modifyIngredient = async (nom, alias, family_of, id) => {
	const req = await axios.post(
		'http://localhost:4000',
		{
			query: MODIFY_INGREDIENT,
			variables: {
				nom,
				alias,
				family_of,
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
	return res.data.modifyIngredient
		? res.data.modifyIngredient
		: res.errors[0];
};
export const deleteIngredient = async id => {
	const req = await axios.post(
		'http://localhost:4000',
		{
			query: DELETE_INGREDIENT,
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
	return res.data.deleteIngredient
		? res.data.deleteIngredient
		: res.errors[0].message;
};
