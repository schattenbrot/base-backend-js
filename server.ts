import { DOMAIN, MONGO_URI, PORT } from 'app/config/environment';
import errorHandler from 'app/errors/errorHandler';
import express from 'express';
import createRouter from 'express-file-routing';
import mongoose from 'mongoose';
import path from 'path';

(async () => {
	const app = express();

	app.use(express.json());

	await createRouter(app, {
		directory: path.join(__dirname, 'app', 'routes'),
	});

	app.use(errorHandler);

	try {
		await mongoose.connect(MONGO_URI);
	} catch (err) {
		console.error(err);
	}

	app.listen(PORT, () => {
		console.log(`Server is running on ${DOMAIN}:${PORT}`);
	});
})();
