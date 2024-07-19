import { JWT_KEY } from 'app/config/environment';
import { Role } from 'app/models/user.model';
import jwt from 'jsonwebtoken';

export const generateJWT = (id: string, email: string, roles: Role[]) => {
	return jwt.sign(
		{
			id,
			email,
			roles,
		},
		JWT_KEY,
		{
			expiresIn: '14d',
		}
	);
};

export const generateExpiredJWT = () => {
	return jwt.sign({}, JWT_KEY, {
		expiresIn: 0,
	});
};
