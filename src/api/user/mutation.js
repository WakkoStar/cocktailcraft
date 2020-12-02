import axios from 'axios';
import { SERVER_URL } from '../../config';

const REPORT_USER = `mutation reportUser($user_id: Int!){
    reportUser(user_id: $user_id)
}`;

const BAN_USER = `mutation banUser($user_id: Int!){
    banUser(user_id: $user_id)
}`;

export const reportUser = async user_id => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: REPORT_USER,
			variables: {
				user_id,
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);

	const res = req.data;
	return res.data.reportUser ? res.data.reportUser : res.errors[0];
};

export const banUser = async user_id => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: BAN_USER,
			variables: {
				user_id,
			},
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);

	const res = req.data;
	return res.data.banUser ? res.data.banUser : res.errors[0];
};
