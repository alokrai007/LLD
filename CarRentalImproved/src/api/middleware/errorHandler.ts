import { Request, Response, NextFunction } from 'express';
import { ValidationError, BusinessError, NotFoundError, ReservationError } from '../../utils/errors';
import { logger } from '../../utils/logger';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error(`${err.name}: ${err.message}`);

    if (err instanceof ValidationError) {
        return res.status(400).json({
            status: 'error',
            message: err.message
        });
    }

    if (err instanceof BusinessError) {
        return res.status(400).json({
            status: 'error',
            message: err.message
        });
    }

    if (err instanceof NotFoundError) {
        return res.status(404).json({
            status: 'error',
            message: err.message
        });
    }

    if (err instanceof ReservationError) {
        return res.status(400).json({
            status: 'error',
            message: err.message
        });
    }

    // Default error
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
}; 