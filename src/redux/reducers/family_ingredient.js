const initialFamily = [];

const familyCocktailReducer = (state = initialFamily, { type, payload }) => {
	let id, ingredientId;
	if (payload) {
		id = payload.id !== undefined ? payload.id : undefined;
		ingredientId = payload.ingredientId ? payload.ingredientId : undefined;
	}
	switch (type) {
		case 'SET_FAMILY':
			return payload[0] !== null
				? payload.map((family, index) => {
						return { id: index, ingredientId: family };
				  })
				: initialFamily;
		case 'ADD_FAMILY':
			return [
				...state,
				{
					id,
					ingredientId: null,
				},
			];
		case 'UPDATE_FAMILY':
			return state.map(family =>
				family.id === id ? { ...family, ingredientId } : family
			);
		case 'DELETE_FAMILY':
			return state.filter(family => family.id !== id);
		default:
			return state;
	}
};

export default familyCocktailReducer;
