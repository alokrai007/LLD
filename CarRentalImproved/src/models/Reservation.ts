import { IReservation, IUser, IVehicle, ReservationStatus } from '../types';
import { ReservationError } from '../utils/errors';

/**
 * Reservation class representing a vehicle reservation in the system
 */
export class Reservation implements IReservation {
    private static nextId = 1;

    constructor(
        public id: number = Reservation.nextId++,
        public user: IUser,
        public vehicle: IVehicle,
        public startDate: Date,
        public endDate: Date,
        public status: ReservationStatus = ReservationStatus.PENDING,
        public totalCost: number = 0
    ) {
        this.validateReservation();
        this.calculateTotalCost();
    }

    /**
     * Validates reservation data
     * @throws {ReservationError} if validation fails
     */
    private validateReservation(): void {
        if (!this.user) {
            throw new ReservationError('User is required');
        }
        if (!this.vehicle) {
            throw new ReservationError('Vehicle is required');
        }
        if (!this.startDate || !this.endDate) {
            throw new ReservationError('Start and end dates are required');
        }
        if (this.startDate >= this.endDate) {
            throw new ReservationError('End date must be after start date');
        }
        if (this.vehicle.getStatus() !== 'AVAILABLE') {
            throw new ReservationError('Vehicle is not available');
        }
    }

    getReservationId(): number {
        return this.id;
    }

    getStatus(): ReservationStatus {
        return this.status;
    }

    setStatus(status: ReservationStatus): void {
        this.status = status;
    }

    /**
     * Calculates the total cost of the reservation
     */
    calculateTotalCost(): number {
        const days = Math.ceil((this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24));
        this.totalCost = days * this.vehicle.getDailyRate();
        return this.totalCost;
    }

    /**
     * Cancels the reservation
     * @throws {ReservationError} if reservation cannot be cancelled
     */
    cancel(): void {
        if (this.status === ReservationStatus.CANCELLED) {
            throw new ReservationError('Reservation is already cancelled');
        }
        if (this.status === ReservationStatus.COMPLETED) {
            throw new ReservationError('Cannot cancel a completed reservation');
        }
        this.status = ReservationStatus.CANCELLED;
    }

    /**
     * Returns a string representation of the reservation
     */
    toString(): string {
        return `Reservation #${this.id} - ${this.user.getName()} - ${this.vehicle.getVehicleType()} (${this.status})`;
    }
} 