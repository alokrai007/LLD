import './api';
import { VehicleInventoryManagement } from './services/InventoryManagement';
import { Store } from './services/Store';
import { Vehicle } from './models/Vehicle';
import { User } from './models/User';
import { VehicleType, VehicleStatus } from './types';

/**
 * Main function to demonstrate the car rental system
 */
async function main() {
    try {
        // Initialize the system
        console.log('Initializing Car Rental System...\n');
        
        const inventoryManagement = new VehicleInventoryManagement();
        const store = new Store(inventoryManagement);

        // Add some vehicles to the inventory
        console.log('Adding vehicles to inventory...');
        const vehicles = [
            new Vehicle(1, 'KA023', 100, VehicleType.CAR),
            new Vehicle(2, 'KA024', 150, VehicleType.BIKE),
            new Vehicle(3, 'KA025', 200, VehicleType.TRUCK),
            new Vehicle(4, 'KA026', 180, VehicleType.VAN)
        ];
        inventoryManagement.addVehicle(vehicles);
        console.log('Vehicles added successfully!\n');

        // Create a user
        console.log('Creating a new user...');
        const user = new User(1, 'John Doe', 'john@example.com', 1234567890, 'Bangalore');
        console.log(`User created: ${user.getName()}\n`);

        // Display available vehicles
        console.log('Available Vehicles:');
        const availableVehicles = store.getAvailableVehicles();
        availableVehicles.forEach(vehicle => {
            console.log(`- ${vehicle.getVehicleType()} (${vehicle.getLicenseNumber()}): $${vehicle.getDailyRate()}/day`);
        });
        console.log();

        // Create a reservation
        console.log('Creating a reservation...');
        const startDate = new Date('2024-03-20');
        const endDate = new Date('2024-03-25');
        const reservation = store.createReservation(user, 1, startDate, endDate);

        if (reservation) {
            console.log('Reservation created successfully!');
            console.log(`Reservation ID: ${reservation.getReservationId()}`);
            console.log(`Total Cost: $${reservation.calculateTotalCost()}\n`);
        }

        // Display user's reservations
        console.log('User Reservations:');
        const userReservations = store.getUserReservations(user.id);
        userReservations.forEach(reservation => {
            console.log(`- ${reservation.toString()}`);
        });
        console.log();

        // Cancel a reservation
        console.log('Cancelling reservation...');
        if (reservation) {
            const cancelled = store.cancelReservation(reservation.getReservationId());
            console.log(cancelled ? 'Reservation cancelled successfully!' : 'Failed to cancel reservation');
        }

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Run the main function
main().catch(console.error); 