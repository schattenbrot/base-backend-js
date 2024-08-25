export class CustomError extends Error {
	status: number = 500;

	constructor(message: string, status: number = 500) {
		super(message);
		this.status = status;
	}
}

export class BadDataError extends CustomError {
	constructor(message?: string) {
		const status = 400;
		super(message ?? 'BadData', status);
	}
}

export class UnauthorizedError extends CustomError {
	constructor(message?: string) {
		const status = 401;
		super(message ?? 'Unauthorized', status);
	}
}

export class InternalServerErrorError extends CustomError {
	constructor() {
		const status = 500;
		super('Internal Server Error', status);
	}
}
