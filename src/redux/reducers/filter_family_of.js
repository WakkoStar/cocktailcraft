const initialState = null;

const filterReducer = (state = initialState, { type, payload }) => {
	let value;
	if (payload) {
		value = payload.value !== undefined ? payload.value : undefined;
	}
	switch (type) {
		case 'SET_FILTER':
			return { ...state, value };

		default:
			return state;
	}
};

export default filterReducer;
