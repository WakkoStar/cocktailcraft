export const setGout = payload => ({
	type: 'SET_GOUT',
	payload,
});

export const addGout = id => {
	return {
		type: 'ADD_GOUT',
		payload: { id: id },
	};
};

export const updateGout = payload => ({
	type: 'UPDATE_GOUT',
	payload,
});

export const deleteGout = payload => ({
	type: 'DELETE_GOUT',
	payload,
});
