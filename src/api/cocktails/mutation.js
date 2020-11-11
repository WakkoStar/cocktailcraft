import axios from 'axios';
import { SERVER_URL } from '../../config';

const CREATE_COCKTAIL = `mutation createCocktail ($nom: String!, $gout_array: [Int!]!, $difficulty: String!) {
    createCocktail (nom: $nom, gout_array: $gout_array, difficulty: $difficulty)
}`;

const MODIFY_COCKTAIL = `mutation modifyCocktail ($nom: String!, $gout_array: [Int!]!, $difficulty: String!, $id: Int!) {
    modifyCocktail (nom: $nom, gout_array: $gout_array, difficulty: $difficulty, id: $id)
}`;

const DELETE_COCKTAIL = `mutation deleteCocktail ($id: Int!) {
    deleteCocktail (id: $id)
}`;

export const createCocktail = async (nom, gout_array, difficulty) => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: CREATE_COCKTAIL,
			variables: {
				nom,
				gout_array,
				difficulty,
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);

	const res = req.data;
	return res.data.createCocktail ? res.data.createCocktail : res.errors[0];
};

export const modifyCocktail = async (nom, gout_array, difficulty, id) => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: MODIFY_COCKTAIL,
			variables: {
				nom,
				gout_array,
				difficulty,
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
	return res.data.modifyCocktail ? res.data.modifyCocktail : res.errors[0];
};
export const deleteCocktail = async id => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: DELETE_COCKTAIL,
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
	return res.data.deleteCocktail ? res.data.deleteCocktail : res.errors[0];
};
