import { ForbiddenError, UnauthorizedError } from 'app/errors/customError';
import { generateAccessToken, verifyRefreshToken } from 'app/utils/jwtTokens';
import { Handler } from 'express';

export const get: Handler = async (req, res, next) => {
	const refreshToken = req.cookies['refreshToken'];
	console.log('refresh', refreshToken);
	if (!refreshToken) {
		return next(new ForbiddenError('No refresh token'));
	}
	const user = verifyRefreshToken(refreshToken);
	if (!user) {
		return next(new UnauthorizedError('Invalid refresh token'));
	}
	// Issue a new accessToken
	console.log(user);
	const accessToken = generateAccessToken(user);
	res.json({ accessToken });
};
