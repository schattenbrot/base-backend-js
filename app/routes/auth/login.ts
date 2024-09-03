import { REFRESH_TOKEN_SECURE } from 'app/config/environment';
import {
	InternalServerErrorError,
	UnauthorizedError,
} from 'app/errors/customError';
import { User as UserModel } from 'app/models/user.model';
import { generateAccessToken, generateRefreshToken } from 'app/utils/jwtTokens';
import bcrypt from 'bcrypt';
import { Handler } from 'express';
import { body, validationResult } from 'express-validator';

export const loginValidator = [
	body('email').isEmail().withMessage('Email must be valid'),
	body('password').trim().notEmpty().withMessage('Password must be valid'),
];

const loginHandler: Handler = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { email, password } = req.body;

	try {
		const user = await UserModel.findOne({ email });
		if (!user) {
			return next(new UnauthorizedError('Wrong email or password'));
		}

		const passwordsMatch = await bcrypt.compare(password, user.password);
		if (!passwordsMatch) {
			return next(new UnauthorizedError('Wrong email or password'));
		}

		const tokenPayload = {
			id: user._id,
			email: user.email,
			roles: user.roles,
		};

		const refreshToken = generateRefreshToken(tokenPayload);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
			secure: REFRESH_TOKEN_SECURE, // Use 'true' if you're serving over HTTPS
			sameSite: REFRESH_TOKEN_SECURE ? 'strict' : 'lax', // Can also be 'Strict' or 'None', depending on your requirements
			// domain: DOMAIN, // The domain for which the cookie is valid
			path: '/', // The path for which the cookie is valid
		});

		const accessToken = generateAccessToken(tokenPayload);

		res.json({
			accessToken,
			user: {
				_id: user._id,
				email: user.email,
				roles: user.roles,
			},
		});
	} catch (err) {
		return next(new InternalServerErrorError());
	}
};

export const post = [loginValidator, loginHandler];
