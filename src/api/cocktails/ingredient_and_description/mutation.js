import axios from 'axios';
import { SERVER_URL } from '../../../config';

const CREATE_DESCRIPTION = `mutation createDescriptionCocktail ($input: descriptionInput!) {
    createDescriptionCocktail (input: $input)
}`;

const CREATE_INGREDIENT = `mutation createIngredientCocktail ($input: ingredientInput!) {
    createIngredientCocktail (input: $input)
}`;

const MODIFY_DESCRIPTION = `mutation modifyDescriptionCocktail ($input: descriptionInput!) {
    modifyDescriptionCocktail (input: $input)
}`;

const MODIFY_INGREDIENT = `mutation modifyIngredientCocktail ($input: ingredientInput!) {
    modifyIngredientCocktail (input: $input)
}`;

const DELETE_DESCRIPTION = `mutation deleteDescriptionCocktail ($input: descriptionInput!) {
    deleteDescriptionCocktail (input: $input)
}`;

const DELETE_INGREDIENT = `mutation deleteIngredientCocktail ($input: ingredientInput!) {
    deleteIngredientCocktail (input: $input)
}`;

const createDescription = async input => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: CREATE_DESCRIPTION,
			variables: {
				input: {
					preparation: input.preparation,
					content: input.content,
					id_cocktail: parseInt(input.id_cocktail),
				},
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);

	const res = req.data;
	return res.data.createDescriptionCocktail
		? res.data.createDescriptionCocktail
		: res.errors[0];
};

const createIngredient = async input => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: CREATE_INGREDIENT,
			variables: {
				input: {
					ingredient_id: parseInt(input.ingredient_id),
					volume: input.volume,
					id_cocktail: parseInt(input.id_cocktail),
				},
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);

	const res = req.data;
	return res.data.createIngredientCocktail
		? res.data.createIngredientCocktail
		: res.errors[0];
};

const modifyDescription = async (input, id) => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: MODIFY_DESCRIPTION,
			variables: {
				input: {
					preparation: input.preparation,
					content: input.content,
					id_cocktail: parseInt(input.id_cocktail),
				},
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);

	const res = req.data;
	return res.data.modifyDescriptionCocktail
		? res.data.modifyDescriptionCocktail
		: res.errors[0];
};

const modifyIngredient = async (input, id) => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: MODIFY_INGREDIENT,
			variables: {
				input: {
					ingredient_id: parseInt(input.ingredient_id),
					volume: input.volume,
					id_cocktail: parseInt(input.id_cocktail),
				},
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);

	const res = req.data;
	return res.data.modifyIngredientCocktail
		? res.data.modifyIngredientCocktail
		: res.errors[0];
};

const deleteDescription = async input => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: DELETE_DESCRIPTION,
			variables: {
				input: {
					preparation: input.preparation,
					content: input.content,
					id_cocktail: parseInt(input.id_cocktail),
				},
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);

	const res = req.data;
	return res.data.deleteDescriptionCocktail
		? res.data.deleteDescriptionCocktail
		: res.errors[0];
};

const deleteIngredient = async input => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: DELETE_INGREDIENT,
			variables: {
				input: {
					ingredient_id: parseInt(input.ingredient_id),
					volume: input.volume,
					id_cocktail: parseInt(input.id_cocktail),
				},
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);

	const res = req.data;
	return res.data.deleteIngredientCocktail
		? res.data.deleteIngredientCocktail
		: res.errors[0];
};

const selectItems = (previous, actual) => {
	const toDelete = previous.filter(el => !actual.includes(el));
	const toUpdate = previous.filter(el => actual.includes(el));
	const toCreate = actual.filter(el => !previous.includes(el));
	return { toDelete, toUpdate, toCreate };
};

export const refreshIngredient = async (
	ingPrevious,
	ingActual,
	id_cocktail
) => {
	const previous = ingPrevious.map(({ ingredient_id }) =>
		parseInt(ingredient_id)
	);
	const actual = ingActual.map(({ ingredient_id }) =>
		parseInt(ingredient_id)
	);
	const items = selectItems(previous, actual);

	items.toDelete.map(async ingredient_id => {
		const ingredient = ingPrevious.find(
			el => el.ingredient_id === parseInt(ingredient_id)
		);
		await deleteIngredient({ ...ingredient, id_cocktail });
	});
	items.toUpdate.map(async ingredient_id => {
		const ingredient = ingActual.find(
			el => el.ingredient_id === parseInt(ingredient_id)
		);
		await modifyIngredient({ ...ingredient, id_cocktail });
	});
	items.toCreate.map(async ingredient_id => {
		const ingredient = ingActual.find(
			el => el.ingredient_id === parseInt(ingredient_id)
		);
		await createIngredient({ ...ingredient, id_cocktail });
	});
};

export const refreshDescription = async (
	descPrevious,
	descActual,
	id_cocktail
) => {
	const previous = descPrevious.map(({ preparation }) => preparation);
	const actual = descActual.map(({ preparation }) => preparation);
	const items = selectItems(previous, actual);

	items.toDelete.map(async preparation => {
		const description = descPrevious.find(
			el => el.preparation === preparation
		);
		await deleteDescription({ ...description, id_cocktail });
	});
	items.toUpdate.map(async preparation => {
		const description = descActual.find(
			el => el.preparation === preparation
		);
		await modifyDescription({ ...description, id_cocktail });
	});
	items.toCreate.map(async preparation => {
		const description = descActual.find(
			el => el.preparation === preparation
		);
		await createDescription({ ...description, id_cocktail });
	});
};
