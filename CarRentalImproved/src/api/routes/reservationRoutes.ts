import { Router } from 'express';
import { ReservationController } from '../controllers/reservationController';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();
const reservationController = new ReservationController();

// Create new reservation
router.post(
    '/',
    [
        body('userId').isNumeric(),
        body('vehicleId').isNumeric(),
        body('startDate').isISO8601(),
        body('endDate').isISO8601()
    ],
    validateRequest,
    reservationController.createReservation
);

// Get reservation by ID
router.get(
    '/:id',
    param('id').isNumeric(),
    validateRequest,
    reservationController.getReservation
);

// Get user reservations
router.get(
    '/user/:userId',
    param('userId').isNumeric(),
    validateRequest,
    reservationController.getUserReservations
);

// Cancel reservation
router.post(
    '/:id/cancel',
    param('id').isNumeric(),
    validateRequest,
    reservationController.cancelReservation
);

export default router; 