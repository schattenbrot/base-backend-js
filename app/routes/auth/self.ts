import { InternalServerErrorError } from 'app/errors/customError';
import isAuth from 'app/middlewares/isAuth';
import { User } from 'app/models/user.model';
import { Handler } from 'express';

const getSelfHandler: Handler = async (req, res, next) => {
	const authUser = req.user!;

	try {
		const user = await User.findById(authUser._id);
		res.status(200).json(user);
	} catch (err) {
		next(new InternalServerErrorError());
	}
};

export const get = [isAuth, getSelfHandler];
