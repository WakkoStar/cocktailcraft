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
	const req = await axios.post(
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
	const res = req.data;
	return res.data.gout ? res.data.gout : res.errors;
};

export const getOneGout = async id => {
	const req = await axios.post(
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
	const res = req.data;
	return res.data.gout ? res.data.gout : res.errors;
};
