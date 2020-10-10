export const addIngredient = payload =>
	dispatch({
		type: 'ADD_INGREDIENT',
		payload,
	});

export const updateIngredient = payload =>
	dispatch({
		type: 'UPDATE_INGREDIENT',
		payload,
	});

export const deleteIngredient = payload =>
	dispatch({
		type: 'DELETE_INGREDIENT',
		payload,
	});
