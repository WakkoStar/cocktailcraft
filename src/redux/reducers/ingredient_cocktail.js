const { default: Ingredient } = require('../../Ingredients/ingredient');

const initialIngredients = [
	{
		id: 0,
		nom: '',
		volume: '',
	},
];

const ingredientCocktailReducer = (
	state = initialIngredients,
	{ type, payload }
) => {
	let id, nom, volume;
	if (payload) {
		id = payload.id ? payload.id : undefined;
		nom = payload.nom ? payload.nom : undefined;
		volume = payload.volume ? payload.volume : undefined;
	}
	switch (type) {
		case 'ADD_INGREDIENT':
			return [
				...state,
				{
					id,
					nom,
					volume,
				},
			];
		case 'UPDATE_INGREDIENT':
			return state.map(ingredient =>
				ingredient.id === id
					? { ...ingredient, nom, volume }
					: ingredient
			);
		case 'DELETE_INGREDIENT':
			return state.filter(ingredient => ingredient.id !== id);
		default:
			return state;
	}
};

export default ingredientCocktailReducer;
