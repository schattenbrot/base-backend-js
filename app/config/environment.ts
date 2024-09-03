type Env = 'production' | 'development';

type Environment = {
	NODE_ENV: Env;
	DOMAIN: string;
	PORT: number;
	MONGO_URI: string;
	ACCESS_TOKEN_SECRET: string;
	REFRESH_TOKEN_SECRET: string;
	REFRESH_TOKEN_SECURE: boolean;
	CORS_ORIGIN: string[];
};

export const NODE_ENV = (process.env.NODE_ENV as Env) || 'development';
export const DOMAIN = process.env.DOMAIN || 'localhost';
export const PORT = parseInt(process.env.PORT || '8080');
export const MONGO_URI =
	process.env.MONGO_URI || 'mongodb://localhost:27017/basic';
export const ACCESS_TOKEN_SECRET =
	process.env.ACCESS_TOKEN_SECRET || 'supersecretpassword';
export const REFRESH_TOKEN_SECRET =
	process.env.REFRESH_TOKEN_SECRET || 'supersecretrefresh';
export const REFRESH_TOKEN_SECURE =
	(process.env.REFRESH_TOKEN_SECURE || 'false').toLowerCase() === 'true';
export const CORS_ORIGIN = (
	process.env.CORS_ORIGIN || 'http://localhost:4200 http://localhost:3000'
).split(' ');

const environment: Environment = {
	NODE_ENV,
	DOMAIN,
	PORT,
	MONGO_URI,
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET,
	REFRESH_TOKEN_SECURE,
	CORS_ORIGIN,
};

export default environment;
