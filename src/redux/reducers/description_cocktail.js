const initialDescriptions = [
	{
		id: 0,
		content: '',
		preparation: '',
	},
];

const descriptionCocktailReducer = (
	state = initialDescriptions,
	{ type, payload }
) => {
	let id, content, preparation;
	if (payload) {
		id = payload.id ? payload.id : undefined;
		content = payload.content ? payload.content : undefined;
		preparation = payload.preparation ? payload.preparation : undefined;
	}
	switch (type) {
		case 'ADD_DESCRIPTION':
			return [
				...state,
				{
					id,
					content,
					preparation,
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
