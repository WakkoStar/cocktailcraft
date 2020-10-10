export const addGout = payload =>
	dispatch({
		type: 'ADD_GOUT',
		payload,
	});

export const updateGout = payload =>
	dispatch({
		type: 'UPDATE_GOUT',
		payload,
	});

export const deleteGout = payload =>
	dispatch({
		type: 'DELETE_GOUT',
		payload,
	});
