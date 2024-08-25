import { DOMAIN, MONGO_URI, PORT } from 'app/config/environment';
import errorHandler from 'app/errors/errorHandler';
import cookieParser from 'cookie-parser';
import express from 'express';
import createRouter from 'express-file-routing';
import mongoose from 'mongoose';
import path from 'path';

(async () => {
	const app = express();

	app.use(express.json());
	app.use(cookieParser());

	await createRouter(app, {
		directory: path.join(__dirname, 'app', 'routes'),
	});

	app.use(errorHandler);

	try {
		await mongoose.connect(MONGO_URI);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}

	app.listen(PORT, () => {
		console.log(`Server is running on ${DOMAIN}:${PORT}`);
	});
})();
