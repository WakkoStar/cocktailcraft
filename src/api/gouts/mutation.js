import axios from 'axios';

const CREATE_GOUT = `
    mutation createGout ($nom: String!) {
    	createGout (nom: $nom)
	}
`;

const MODIFY_GOUT = `
   mutation modifyGout ($nom: String!, $id: Int!) {
		modifyGout (nom: $nom, id: $id)
	}
`;

const DELETE_GOUT = `
    mutation deleteGout ($id: Int!) {
		deleteGout (id: $id)
	}
`;

export const createGout = async nom => {
	const req = await axios.post(
		'http://localhost:4000/graphql',
		{
			query: CREATE_GOUT,
			variables: {
				nom,
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);

	const res = req.data;
	return res.data.createGout ? res.data.createGout : res.errors[0];
};

export const modifyGout = async (nom, id) => {
	const req = await axios.post(
		'http://localhost:4000/graphql',
		{
			query: MODIFY_GOUT,
			variables: {
				nom,
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
	return res.data.modifyGout ? res.data.modifyGout : res.errors[0];
};

export const deleteGout = async id => {
	const req = await axios.post(
		'http://localhost:4000/graphql',
		{
			query: DELETE_GOUT,
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
	return res.data.createGout ? res.data.createGout : res.errors[0];
};
