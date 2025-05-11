import { VehicleInventoryManagement } from "./InventoryManagement";
import { Store } from "./store";
import { VehicleType } from "./types";
import { User } from "./User";
import { Vehicle } from "./Vehicle";

async function main(){
    const inventoryMangement = new VehicleInventoryManagement();
    const store = new Store(inventoryMangement);

    
// Add cars to inventory
    const vehicle1 = new Vehicle(1, 'KA023', 100, VehicleType.CAR);
    const vehicle2 = new Vehicle(2, 'KA024', 150, VehicleType.BIKE);
    inventoryMangement.addVehicle([vehicle1, vehicle2]);

    const user = new User(1, "Alok", "alokrai@gmail.com", 9532799903, "bangalore");

    console.log('Available Cars:');

    
    const availableCars = store.getAvailableVehicles();
    availableCars.forEach(car => console.log(`${car.getVehicleId()}: ${car.getVehicleType()} ${car.getLicenseNumber()})`));

    // Customer reserves a car
    const carToReserve = 1; // Assuming the user selects this car
    const startDate = new Date('2025-06-01');
    const endDate = new Date('2025-06-05');
    const reservation = store.createResevation(user, carToReserve, startDate, endDate);

    if (reservation) {
  console.log(`Reservation Successful! Reservation ID: ${reservation.getResevarionId()}`);
  console.log(`Car ${carToReserve} has been reserved for you.`);
}
}

main();