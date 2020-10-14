export const setFamily = payload => ({
	type: 'SET_FAMILY',
	payload,
});

export const addFamily = id => {
	return {
		type: 'ADD_FAMILY',
		payload: { id: id },
	};
};

export const updateFamily = payload => ({
	type: 'UPDATE_FAMILY',
	payload,
});

export const deleteFamily = payload => ({
	type: 'DELETE_FAMILY',
	payload,
});
