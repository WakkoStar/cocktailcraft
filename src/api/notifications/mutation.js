import axios from 'axios';
import { SERVER_URL } from '../../config';

const ADD_NOTIFICATION = `mutation addNotifications($message: String!, $user_id: Int!){
    addNotifications(message: $message, user_id: $user_id)
}`;

export const addNotifications = async (message, user_id) => {
	const req = await axios.post(
		SERVER_URL,
		{
			query: ADD_NOTIFICATION,
			variables: { message, user_id },
		},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
	const res = req.data;
	return res.data.addNotifications
		? res.data.addNotifications
		: res.errors[0];
};
