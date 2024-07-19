import { Handler } from 'express';

export const get: Handler = async (req, res) => {
	// If there was a cookie ... here it could be removed
	res.send('logout Page');
};
