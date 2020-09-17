import axios from 'axios';

const GET_ALL_GOUTS = `{
    gouts {
        id
        nom
    }
}`;

const GET_ONE_GOUT = `
    query Gout($id: Int!) {
        gout(id: $id) {
            id
            nom
        }
    }
`;

export const getAllGouts = async () => {
	const response = await axios.post(
		'http://localhost:4000/graphql',
		{
			query: GET_ALL_GOUTS,
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
	return response.data.data.gouts
		? response.data.data.gouts
		: response.data.errors;
};

export const getOneGout = async id => {
	const response = await axios.post(
		'http://localhost:4000/graphql',
		{
			query: GET_ONE_GOUT,
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

	return response.data.data.gout
		? response.data.data.gout
		: response.data.errors;
};
