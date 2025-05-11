import { Router } from 'express';
import { VehicleController } from '../controllers/vehicleController';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();
const vehicleController = new VehicleController();

// Get all vehicles
router.get('/', vehicleController.getAllVehicles);

// Get available vehicles
router.get('/available', vehicleController.getAvailableVehicles);

// Get vehicle by ID
router.get(
    '/:id',
    param('id').isNumeric(),
    validateRequest,
    vehicleController.getVehicleById
);

// Add new vehicle
router.post(
    '/',
    [
        body('licenseNumber').notEmpty(),
        body('dailyRate').isNumeric().isFloat({ min: 0 }),
        body('type').isIn(['CAR', 'BIKE', 'TRUCK', 'VAN'])
    ],
    validateRequest,
    vehicleController.addVehicle
);

// Update vehicle status
router.patch(
    '/:id/status',
    [
        param('id').isNumeric(),
        body('status').isIn(['AVAILABLE', 'RENTED', 'MAINTENANCE'])
    ],
    validateRequest,
    vehicleController.updateVehicleStatus
);

// Remove vehicle
router.delete(
    '/:id',
    param('id').isNumeric(),
    validateRequest,
    vehicleController.removeVehicle
);

export default router; 