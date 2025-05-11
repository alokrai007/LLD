import { IVehicle, VehicleStatus, VehicleType } from '../types';
import { ValidationError } from '../utils/errors';

/**
 * Vehicle class representing a rentable vehicle in the system
 */
export class Vehicle implements IVehicle {
    private static nextId = 1;

    constructor(
        public id: number = Vehicle.nextId++,
        private licenseNumber: string,
        private dailyRate: number,
        public type: VehicleType,
        public status: VehicleStatus = VehicleStatus.AVAILABLE
    ) {
        this.validateVehicle();
    }

    /**
     * Validates vehicle data
     * @throws {ValidationError} if validation fails
     */
    private validateVehicle(): void {
        if (!this.licenseNumber || this.licenseNumber.trim() === '') {
            throw new ValidationError('License number is required');
        }
        if (this.dailyRate <= 0) {
            throw new ValidationError('Daily rate must be greater than 0');
        }
    }

    getVehicleType(): VehicleType {
        return this.type;
    }

    getLicenseNumber(): string {
        return this.licenseNumber;
    }

    getDailyRate(): number {
        return this.dailyRate;
    }

    getStatus(): VehicleStatus {
        return this.status;
    }

    setStatus(status: VehicleStatus): void {
        this.status = status;
    }

    /**
     * Updates the daily rate of the vehicle
     * @param newRate - The new daily rate
     * @throws {ValidationError} if new rate is invalid
     */
    updateDailyRate(newRate: number): void {
        if (newRate <= 0) {
            throw new ValidationError('Daily rate must be greater than 0');
        }
        this.dailyRate = newRate;
    }

    /**
     * Returns a string representation of the vehicle
     */
    toString(): string {
        return `${this.type} (${this.licenseNumber}) - ${this.status}`;
    }
} 