import { JWT_KEY } from 'app/config/environment';
import { UnauthorizedError } from 'app/errors/customError';
import { Role, User } from 'app/models/user.model';
import { Handler } from 'express';
import jwt from 'jsonwebtoken';

type JwtPayload = {
	id: string;
	email: string;
	role: Role;
	exp: number;
	iat: number;
};

interface UserPayload {
	_id: string;
	email: string;
	roles: Role[];
}

declare global {
	namespace Express {
		interface Request {
			user?: UserPayload;
		}
	}
}

const isAuth: Handler = async (req, res, next) => {
	if (!(req.headers && req.headers.authorization)) {
		return next(new UnauthorizedError());
	}

	const header = req.headers.authorization.split(' ');
	const token = header[1];

	try {
		const payload = jwt.verify(token, JWT_KEY) as JwtPayload;
		if (!payload) {
			return next(new UnauthorizedError());
		}
		if (payload.iat >= Date.now() - 1000) {
			return next(new UnauthorizedError());
		}

		const user = await User.findOne({ _id: payload.id }).select(
			'email role'
		);
		if (!user) {
			return next(new UnauthorizedError());
		}

		req.user = {
			_id: user._id,
			email: user.email,
			roles: user.roles,
		};
		return next();
	} catch (err) {
		return next(new UnauthorizedError());
	}
};

export default isAuth;
