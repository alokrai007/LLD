import { Request, Response, NextFunction } from 'express';
import { VehicleInventoryManagement } from '../../services/InventoryManagement';
import { Vehicle } from '../../models/Vehicle';
import { VehicleType, VehicleStatus } from '../../types';
import { ValidationError } from '../../utils/errors';

export class VehicleController {
    private inventoryManagement: VehicleInventoryManagement;

    constructor() {
        this.inventoryManagement = new VehicleInventoryManagement();
    }

    // Get all vehicles
    getAllVehicles = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const vehicles = this.inventoryManagement.getAllVehicles();
            res.json({
                status: 'success',
                data: vehicles
            });
        } catch (error) {
            next(error);
        }
    };

    // Get available vehicles
    getAvailableVehicles = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const vehicles = this.inventoryManagement.getAvailableVehicles();
            res.json({
                status: 'success',
                data: vehicles
            });
        } catch (error) {
            next(error);
        }
    };

    // Get vehicle by ID
    getVehicleById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const vehicle = this.inventoryManagement.getVehicle(Number(req.params.id));
            res.json({
                status: 'success',
                data: vehicle
            });
        } catch (error) {
            next(error);
        }
    };

    // Add new vehicle
    addVehicle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { licenseNumber, dailyRate, type } = req.body;

            if (!licenseNumber || !dailyRate || !type) {
                throw new ValidationError('Missing required fields');
            }

            const vehicle = new Vehicle(
                undefined,
                licenseNumber,
                dailyRate,
                type as VehicleType
            );

            this.inventoryManagement.addVehicle([vehicle]);
            res.status(201).json({
                status: 'success',
                data: vehicle
            });
        } catch (error) {
            next(error);
        }
    };

    // Update vehicle status
    updateVehicleStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { status } = req.body;
            const vehicleId = Number(req.params.id);

            if (!status || !Object.values(VehicleStatus).includes(status)) {
                throw new ValidationError('Invalid status');
            }

            const success = this.inventoryManagement.updateVehicleStatus(
                vehicleId,
                status as VehicleStatus
            );

            if (!success) {
                throw new ValidationError('Failed to update vehicle status');
            }

            res.json({
                status: 'success',
                message: 'Vehicle status updated successfully'
            });
        } catch (error) {
            next(error);
        }
    };

    // Remove vehicle
    removeVehicle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const success = this.inventoryManagement.removeVehicle(Number(req.params.id));
            
            if (!success) {
                throw new ValidationError('Failed to remove vehicle');
            }

            res.json({
                status: 'success',
                message: 'Vehicle removed successfully'
            });
        } catch (error) {
            next(error);
        }
    };
} 