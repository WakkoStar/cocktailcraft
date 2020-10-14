export const setIngredient = payload => ({
	type: 'SET_INGREDIENT',
	payload,
});

export const addIngredient = id => {
	return {
		type: 'ADD_INGREDIENT',
		payload: { id: id },
	};
};

export const updateIngredient = payload => ({
	type: 'UPDATE_INGREDIENT',
	payload,
});

export const deleteIngredient = payload => ({
	type: 'DELETE_INGREDIENT',
	payload,
});
