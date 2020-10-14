const initialDescription = [];

const descriptionCocktailReducer = (
	state = initialDescription,
	{ type, payload }
) => {
	let id, content, preparation;
	if (payload) {
		id = payload.id !== undefined ? payload.id : undefined;
		content = payload.content ? payload.content : undefined;
		preparation = payload.preparation ? payload.preparation : undefined;
	}
	switch (type) {
		case 'SET_DESCRIPTION':
			return payload[0] !== null
				? payload.map(({ content, preparation }, index) => {
						return { id: index, content, preparation };
				  })
				: initialDescription;
		case 'ADD_DESCRIPTION':
			return [
				...state,
				{
					id,
					content: null,
					preparation: null,
				},
			];
		case 'UPDATE_DESCRIPTION':
			return state.map(description =>
				description.id === id
					? { ...description, content, preparation }
					: description
			);
		case 'DELETE_DESCRIPTION':
			return state.filter(description => description.id !== id);
		default:
			return state;
	}
};

export default descriptionCocktailReducer;
