import {
	CORS_ORIGIN,
	DOMAIN,
	MONGO_URI,
	NODE_ENV,
	PORT,
} from 'app/config/environment';
import errorHandler from 'app/errors/errorHandler';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import createRouter from 'express-file-routing';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';

(async () => {
	const app = express();

	app.use(express.json());
	app.use(cookieParser());
	app.use(
		cors({
			origin: CORS_ORIGIN,
			credentials: true,
		}),
	);
	app.use(morgan('tiny'));

	const apiRouter = express.Router();
	await createRouter(apiRouter, {
		directory: path.join(__dirname, 'app', 'routes'),
	});
	app.use('/api', apiRouter);

	app.use(errorHandler);

	try {
		await mongoose.connect(MONGO_URI);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}

	app.listen(PORT, () => {
		const apiUrl =
			NODE_ENV === 'production'
				? `https://${DOMAIN}`
				: `http://${DOMAIN}:${PORT}`;
		console.log(`API Server is running on ${apiUrl}`);
	});
})();
