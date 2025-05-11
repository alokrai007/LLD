import { IInventoryManagement, IVehicle, VehicleStatus } from '../types';
import { NotFoundError, BusinessError } from '../utils/errors';

/**
 * Service class for managing vehicle inventory
 */
export class VehicleInventoryManagement implements IInventoryManagement {
    private vehicles: Map<number, IVehicle> = new Map();

    /**
     * Adds vehicles to the inventory
     * @param vehicles - Array of vehicles to add
     */
    addVehicle(vehicles: IVehicle[]): void {
        vehicles.forEach(vehicle => {
            if (this.vehicles.has(vehicle.id)) {
                throw new BusinessError(`Vehicle with ID ${vehicle.id} already exists`);
            }
            this.vehicles.set(vehicle.id, vehicle);
        });
    }

    /**
     * Removes a vehicle from the inventory
     * @param vehicleId - ID of the vehicle to remove
     * @returns true if vehicle was removed, false otherwise
     */
    removeVehicle(vehicleId: number): boolean {
        if (!this.vehicles.has(vehicleId)) {
            throw new NotFoundError(`Vehicle with ID ${vehicleId} not found`);
        }
        return this.vehicles.delete(vehicleId);
    }

    /**
     * Gets a vehicle by ID
     * @param vehicleId - ID of the vehicle to get
     * @returns The vehicle or null if not found
     */
    getVehicle(vehicleId: number): IVehicle | null {
        const vehicle = this.vehicles.get(vehicleId);
        if (!vehicle) {
            throw new NotFoundError(`Vehicle with ID ${vehicleId} not found`);
        }
        return vehicle;
    }

    /**
     * Gets all available vehicles
     * @returns Array of available vehicles
     */
    getAvailableVehicles(): IVehicle[] {
        return Array.from(this.vehicles.values())
            .filter(vehicle => vehicle.getStatus() === VehicleStatus.AVAILABLE);
    }

    /**
     * Updates the status of a vehicle
     * @param vehicleId - ID of the vehicle to update
     * @param status - New status for the vehicle
     * @returns true if status was updated, false otherwise
     */
    updateVehicleStatus(vehicleId: number, status: VehicleStatus): boolean {
        const vehicle = this.getVehicle(vehicleId);
        if (!vehicle) {
            return false;
        }
        vehicle.setStatus(status);
        return true;
    }

    /**
     * Gets all vehicles in the inventory
     * @returns Array of all vehicles
     */
    getAllVehicles(): IVehicle[] {
        return Array.from(this.vehicles.values());
    }

    /**
     * Gets vehicles by type
     * @param type - Type of vehicles to get
     * @returns Array of vehicles of the specified type
     */
    getVehiclesByType(type: string): IVehicle[] {
        return Array.from(this.vehicles.values())
            .filter(vehicle => vehicle.getVehicleType() === type);
    }
} 