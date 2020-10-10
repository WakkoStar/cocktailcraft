let nextAliasId = 0;

export const setAlias = payload => ({
	type: 'SET_ALIAS',
	payload,
});

export const addAlias = payload => {
	return {
		type: 'ADD_ALIAS',
		payload: { id: nextAliasId++ },
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
