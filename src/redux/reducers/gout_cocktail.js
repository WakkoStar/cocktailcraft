const initialGout = [];

const goutCocktailReducer = (state = initialGout, { type, payload }) => {
	let id, goutId;
	if (payload) {
		id = payload.id !== undefined ? payload.id : undefined;
		goutId = payload.goutId ? payload.goutId : undefined;
	}
	switch (type) {
		case 'SET_GOUT':
			return payload[0] !== null
				? payload.map((goutId, index) => {
						return { id: index, goutId };
				  })
				: initialGout;
		case 'ADD_GOUT':
			return [
				...state,
				{
					id,
					goutId: null,
				},
			];
		case 'UPDATE_GOUT':
			return state.map(gout =>
				gout.id === id ? { ...gout, goutId } : gout
			);
		case 'DELETE_GOUT':
			return state.filter(gout => gout.id !== id);
		default:
			return state;
	}
};

export default goutCocktailReducer;
