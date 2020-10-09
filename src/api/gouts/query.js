import axios from 'axios';

const GET_ALL_GOUTS = `
	query gouts {
		gouts {
			id
			nom
		}
	}`;

const GET_ONE_GOUT = `
    query gout ($id: Int!) {
		gout (id: $id) {
			id
			nom
		}
	}
`;

export const getAllGouts = async () => {
	const req = await axios.post(
		'http://localhost:4000',
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
	return res.data.gouts ? res.data.gouts : res.errors[0];
};

export const getOneGouts = async id => {
	const req = await axios.post(
		'http://localhost:4000',
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
	return res.data.gout ? res.data.gout : res.errors[0];
};
