import axios from 'axios';
import { SERVER_URL } from '../../config';
axios.defaults.withCredentials = true;

const GET_ONE_COCKTAIL = `query cocktail ($id: Int!) {
    cocktail (id: $id) {
        id
        nom
        descriptions {
            id
            content
            preparation
            id_cocktail
        }
        ingredients {
            id
            ingredient_id
            volume
            nom
            id_cocktail
        }
        gout_array
        difficulty
        user_id
        username
    }
}`;

const GET_ALL_COCKTAIL = `query cocktails {
    cocktails {
        id
        nom
        descriptions {
            id
            content
            preparation
            id_cocktail
        }
        ingredients {
            id
            ingredient_id
            volume
            nom
            id_cocktail
        }
        gout_array
        difficulty
        user_id
        username
    }
}`;

const GET_ALL_FALSE_COCKTAIL = `query cocktails($is_visible: Boolean){
    cocktails(is_visible : $is_visible) {
        id
        nom
        descriptions {
            id
            content
            preparation
            id_cocktail
        }
        ingredients {
            id
            ingredient_id
            volume
            nom
            id_cocktail
        }
        gout_array
        difficulty
        user_id
        username
    }
}`;

const GET_ONE_FALSE_COCKTAIL = `query cocktail ($id: Int!) {
    cocktail (id: $id, is_visible: false) {
        id
        nom
        descriptions {
            id
            content
            preparation
            id_cocktail
        }
        ingredients {
            id
            ingredient_id
            volume
            nom
            id_cocktail
        }
        gout_array
        difficulty
        user_id
        username
    }
}`;

export const getAllCocktails = async () => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: GET_ALL_COCKTAIL,
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
	const res = req.data;
	return res.data.cocktails ? res.data.cocktails : res.errors[0];
};

export const getAllFalseCocktails = async () => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: GET_ALL_FALSE_COCKTAIL,
			variables: {
				is_visible: false,
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
	const res = req.data;
	return res.data.cocktails ? res.data.cocktails : res.errors[0];
};

export const getOneCocktails = async id => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: GET_ONE_COCKTAIL,
			variables: {
				id,
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
	const res = req.data;
	return res.data.cocktail ? res.data.cocktail : res.errors[0];
};

export const getOneFalseCocktails = async id => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: GET_ONE_FALSE_COCKTAIL,
			variables: {
				id,
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
	const res = req.data;
	return res.data.cocktail ? res.data.cocktail : res.errors[0];
};
