export const setDescription = payload => ({
	type: 'SET_DESCRIPTION',
	payload,
});

export const addDescription = id => {
	return {
		type: 'ADD_DESCRIPTION',
		payload: { id: id },
	};
};

export const updateDescription = payload => ({
	type: 'UPDATE_DESCRIPTION',
	payload,
});

export const deleteDescription = payload => ({
	type: 'DELETE_DESCRIPTION',
	payload,
});
