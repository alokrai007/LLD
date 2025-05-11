/**
 * Custom error class for validation errors
 */
export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

/**
 * Custom error class for business logic errors
 */
export class BusinessError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BusinessError';
    }
}

/**
 * Custom error class for not found errors
 */
export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

/**
 * Custom error class for reservation errors
 */
export class ReservationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ReservationError';
    }
} 