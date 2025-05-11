import { Request, Response, NextFunction } from 'express';
import { Store } from '../../services/Store';
import { VehicleInventoryManagement } from '../../services/InventoryManagement';
import { User } from '../../models/User';
import { ValidationError } from '../../utils/errors';

export class ReservationController {
    private store: Store;

    constructor() {
        const inventoryManagement = new VehicleInventoryManagement();
        this.store = new Store(inventoryManagement);
    }

    // Create new reservation
    createReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId, vehicleId, startDate, endDate } = req.body;

            if (!userId || !vehicleId || !startDate || !endDate) {
                throw new ValidationError('Missing required fields');
            }

            // In a real application, you would fetch the user from a database
            const user = new User(userId, 'Test User', 'test@example.com', 1234567890, 'Test Location');

            const reservation = this.store.createReservation(
                user,
                vehicleId,
                new Date(startDate),
                new Date(endDate)
            );

            if (!reservation) {
                throw new ValidationError('Failed to create reservation');
            }

            res.status(201).json({
                status: 'success',
                data: reservation
            });
        } catch (error) {
            next(error);
        }
    };

    // Get reservation by ID
    getReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservation = this.store.getReservation(Number(req.params.id));
            res.json({
                status: 'success',
                data: reservation
            });
        } catch (error) {
            next(error);
        }
    };

    // Get user reservations
    getUserReservations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservations = this.store.getUserReservations(Number(req.params.userId));
            res.json({
                status: 'success',
                data: reservations
            });
        } catch (error) {
            next(error);
        }
    };

    // Cancel reservation
    cancelReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const success = this.store.cancelReservation(Number(req.params.id));
            
            if (!success) {
                throw new ValidationError('Failed to cancel reservation');
            }

            res.json({
                status: 'success',
                message: 'Reservation cancelled successfully'
            });
        } catch (error) {
            next(error);
        }
    };
} 