import {
	InternalServerErrorError,
	UnauthorizedError,
} from 'app/errors/customError';
import { User as UserModel } from 'app/models/user.model';
import { generateJWT } from 'app/utils/generateJWT';
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
			return res
				.status(401)
				.json({ errors: [{ msg: 'Wrong email or password' }] });
		}

		const passwordsMatch = await bcrypt.compare(password, user.password);
		if (!passwordsMatch) {
			return next(new UnauthorizedError('Wrong email or password'));
			return res
				.status(401)
				.json({ errors: [{ msg: 'Wrong email or password' }] });
		}

		const token = generateJWT(user._id, user.email, user.roles);

		res.status(200).json({
			token,
			exp: Math.floor(Date.now() / 1000) + 14 * 24 * 3600,
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
