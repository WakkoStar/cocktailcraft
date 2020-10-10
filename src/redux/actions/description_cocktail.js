export const addDescription = payload =>
	dispatch({
		type: 'ADD_DESCRIPTION',
		payload,
	});

export const updateDescription = payload =>
	dispatch({
		type: 'UPDATE_DESCRIPTION',
		payload,
	});

export const deleteDescription = payload =>
	dispatch({
		type: 'DELETE_DESCRIPTION',
		payload,
	});
