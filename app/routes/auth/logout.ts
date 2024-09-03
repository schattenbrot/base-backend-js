import { Handler } from 'express';

export const get: Handler = async (_req, res) => {
	res.cookie('refreshToken', 'deleted cookie', {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
	});

	// Respond with a success message
	res.json({ message: 'Logout successful' });
};
