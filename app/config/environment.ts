type Env = 'production' | 'development';

type Environment = {
	NODE_ENV: Env;
	DOMAIN: string;
	PORT: number;
	MONGO_URI: string;
	JWT_KEY: string;
};

export const NODE_ENV = (process.env.NODE_ENV as Env) || 'development';
export const DOMAIN = process.env.DOMAIN || 'http://localhost';
export const PORT = parseInt(process.env.PORT || '8080');
export const MONGO_URI =
	process.env.MONGO_URI || 'mongodb://localhost:27017/basic';
export const JWT_KEY = process.env.JWT_KEY || 'supersecretpassword';

const environment: Environment = {
	NODE_ENV,
	DOMAIN,
	PORT,
	MONGO_URI,
	JWT_KEY,
};

export default environment;
