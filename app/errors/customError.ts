export class Explerror extends Error {
	status: number = 500;

	constructor(message: string, status: number = 500) {
		super(message);
		this.status = status;
	}
}

export class BadDataError extends Explerror {
	constructor(message: string = 'BadData') {
		const status = 400;
		super(message, status);
	}
}

export class ForbiddenError extends Explerror {
	constructor(message: string = 'Forbidden') {
		const status = 403;
		super(message, status);
	}
}

export class UnauthorizedError extends Explerror {
	constructor(message: string = 'Unauthorized') {
		const status = 401;
		super(message, status);
	}
}

export class InternalServerErrorError extends Explerror {
	constructor() {
		const status = 500;
		super('Internal Server Error', status);
	}
}
