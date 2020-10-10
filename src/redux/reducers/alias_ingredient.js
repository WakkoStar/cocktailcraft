const initialAlias = [];

const aliasCocktailReducer = (state = initialAlias, { type, payload }) => {
	let id, nom;
	if (payload) {
		id = payload.id !== undefined ? payload.id : undefined;
		nom = payload.nom ? payload.nom : undefined;
	}
	switch (type) {
		case 'SET_ALIAS':
			return payload[0] !== null
				? payload.map((alias, index) => {
						return { id: index, nom: alias };
				  })
				: initialAlias;
		case 'ADD_ALIAS':
			return [
				...state,
				{
					id,
					nom: null,
				},
			];
		case 'UPDATE_ALIAS':
			return state.map(alias =>
				alias.id === id ? { ...alias, nom } : alias
			);
		case 'DELETE_ALIAS':
			return state.filter(alias => alias.id !== id);
		default:
			return state;
	}
};

export default aliasCocktailReducer;
