export const setAlias = payload => ({
	type: 'SET_ALIAS',
	payload,
});

export const addAlias = id => {
	return {
		type: 'ADD_ALIAS',
		payload: { id: id },
	};
};

export const updateAlias = payload => ({
	type: 'UPDATE_ALIAS',
	payload,
});

export const deleteAlias = payload => ({
	type: 'DELETE_ALIAS',
	payload,
});
