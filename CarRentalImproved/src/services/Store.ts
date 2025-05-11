import { IStore, IUser, IVehicle, IReservation, ReservationStatus, VehicleStatus } from '../types';
import { IInventoryManagement } from '../types';
import { Reservation } from '../models/Reservation';
import { BusinessError, NotFoundError } from '../utils/errors';

/**
 * Service class for managing the car rental store operations
 */
export class Store implements IStore {
    private reservations: Map<number, IReservation> = new Map();

    constructor(private inventoryManagement: IInventoryManagement) {}

    /**
     * Creates a new reservation
     * @param user - The user making the reservation
     * @param vehicleId - ID of the vehicle to reserve
     * @param startDate - Start date of the reservation
     * @param endDate - End date of the reservation
     * @returns The created reservation or null if creation failed
     */
    createReservation(
        user: IUser,
        vehicleId: number,
        startDate: Date,
        endDate: Date
    ): IReservation | null {
        try {
            const vehicle = this.inventoryManagement.getVehicle(vehicleId);
            if (!vehicle) {
                throw new NotFoundError(`Vehicle with ID ${vehicleId} not found`);
            }

            if (vehicle.getStatus() !== VehicleStatus.AVAILABLE) {
                throw new BusinessError(`Vehicle ${vehicleId} is not available`);
            }

            // Check for overlapping reservations
            const overlappingReservation = this.findOverlappingReservation(vehicleId, startDate, endDate);
            if (overlappingReservation) {
                throw new BusinessError('Vehicle is already reserved for these dates');
            }

            const reservation = new Reservation(
                undefined,
                user,
                vehicle,
                startDate,
                endDate
            );

            this.reservations.set(reservation.getReservationId(), reservation);
            this.inventoryManagement.updateVehicleStatus(vehicleId, VehicleStatus.RENTED);

            return reservation;
        } catch (error) {
            console.error('Error creating reservation:', error);
            return null;
        }
    }

    /**
     * Cancels a reservation
     * @param reservationId - ID of the reservation to cancel
     * @returns true if cancellation was successful, false otherwise
     */
    cancelReservation(reservationId: number): boolean {
        try {
            const reservation = this.reservations.get(reservationId);
            if (!reservation) {
                throw new NotFoundError(`Reservation with ID ${reservationId} not found`);
            }

            reservation.cancel();
            this.inventoryManagement.updateVehicleStatus(
                reservation.vehicle.id,
                VehicleStatus.AVAILABLE
            );

            return true;
        } catch (error) {
            console.error('Error cancelling reservation:', error);
            return false;
        }
    }

    /**
     * Gets all available vehicles
     * @returns Array of available vehicles
     */
    getAvailableVehicles(): IVehicle[] {
        return this.inventoryManagement.getAvailableVehicles();
    }

    /**
     * Gets a reservation by ID
     * @param reservationId - ID of the reservation to get
     * @returns The reservation or null if not found
     */
    getReservation(reservationId: number): IReservation | null {
        const reservation = this.reservations.get(reservationId);
        if (!reservation) {
            throw new NotFoundError(`Reservation with ID ${reservationId} not found`);
        }
        return reservation;
    }

    /**
     * Gets all reservations for a user
     * @param userId - ID of the user
     * @returns Array of user's reservations
     */
    getUserReservations(userId: number): IReservation[] {
        return Array.from(this.reservations.values())
            .filter(reservation => reservation.user.id === userId);
    }

    /**
     * Finds any overlapping reservations for a vehicle
     * @param vehicleId - ID of the vehicle to check
     * @param startDate - Start date to check
     * @param endDate - End date to check
     * @returns The overlapping reservation or null if none found
     */
    private findOverlappingReservation(
        vehicleId: number,
        startDate: Date,
        endDate: Date
    ): IReservation | null {
        return Array.from(this.reservations.values()).find(reservation => {
            if (reservation.vehicle.id !== vehicleId) return false;
            if (reservation.getStatus() === ReservationStatus.CANCELLED) return false;
            return (
                (startDate >= reservation.startDate && startDate < reservation.endDate) ||
                (endDate > reservation.startDate && endDate <= reservation.endDate) ||
                (startDate <= reservation.startDate && endDate >= reservation.endDate)
            );
        }) || null;
    }
} 