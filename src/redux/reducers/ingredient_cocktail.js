const initialIngredient = [];

const ingredientCocktailReducer = (
	state = initialIngredient,
	{ type, payload }
) => {
	let id, ingredient_id, volume;
	if (payload) {
		id = payload.id !== undefined ? parseInt(payload.id) : undefined;
		ingredient_id = payload.ingredient_id
			? parseInt(payload.ingredient_id)
			: undefined;
		volume = payload.volume ? payload.volume : undefined;
	}
	switch (type) {
		case 'SET_INGREDIENT':
			return payload[0] !== null
				? payload.map(({ ingredient_id, volume }, index) => {
						return { id: index, ingredient_id, volume };
				  })
				: initialIngredient;
		case 'ADD_INGREDIENT':
			return [
				...state,
				{
					id,
					ingredient_id: null,
					volume: null,
				},
			];
		case 'UPDATE_INGREDIENT':
			return state.map(ingredient =>
				ingredient.id === id
					? { ...ingredient, ingredient_id, volume }
					: ingredient
			);
		case 'DELETE_INGREDIENT':
			return state.filter(ingredient => ingredient.id !== id);
		default:
			return state;
	}
};

export default ingredientCocktailReducer;
