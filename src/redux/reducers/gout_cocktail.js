const initialGouts = [
	{
		id: 0,
		nom: '',
	},
];

const goutCocktailReducer = (state = initialGouts, { type, payload }) => {
	let id, nom;
	if (payload) {
		id = payload.id ? payload.id : undefined;
		nom = payload.nom ? payload.nom : undefined;
	}
	switch (type) {
		case 'ADD_GOUT':
			return [
				...state,
				{
					id,
					nom,
				},
			];
		case 'UPDATE_GOUT':
			return state.map(gout =>
				gout.id === id ? { ...gout, nom } : gout
			);
		case 'DELETE_GOUT':
			return state.filter(gout => gout.id !== id);
		default:
			return state;
	}
};

export default goutCocktailReducer;
