import { BadDataError } from 'app/errors/customError';
import { User, validRoles } from 'app/models/user.model';
import { Handler } from 'express';
import { body, validationResult } from 'express-validator';

const registerValidator = [
	body('email').isEmail().withMessage('Email must be valid'),
	body('password')
		.trim()
		.isLength({ min: 3, max: 20 })
		.withMessage('Password must be between 3 and 20 characters'),
	body('roles')
		.optional()
		.isArray({ min: 0 })
		.withMessage('Roles must be an array')
		.custom(roles => {
			const uniqueRoles = new Set(roles);
			if (uniqueRoles.size !== roles.length) {
				throw new Error('Roles must be unique');
			}
			if (roles.includes('admin')) {
				throw new Error('Roles must not be admin');
			}
			for (const role of roles) {
				if (!validRoles.includes(role)) {
					throw new Error(`Invalid role: ${role}`);
				}
			}
			return true;
		}),
];

const emailInUseValidator: Handler = async (req, res, next) => {
	const { email } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return next(new BadDataError('Email is already in use'));
		}
		next();
	} catch (error) {
		return next(error);
	}
};

const registerHandler: Handler = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { email, password, roles } = req.body;

	try {
		const newUser = new User({ email, password, roles: roles ?? ['user'] });
		await newUser.save();
		return res.status(201).json({ msg: 'User created successfully' });
	} catch (err) {
		return next(err);
	}
};

export const post = [registerValidator, emailInUseValidator, registerHandler];
