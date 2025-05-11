import { Reservation } from "./reservation";
import { IReservation, IStore, IUser, IVehicle, IVehicleInventoryManagement, VehicleStatus } from "./types";

export class Store implements IStore {
    vehicleInventoryManagement: IVehicleInventoryManagement;
    reservations: IReservation[];
    // location: Location;
    
    constructor(vehicleInventoryManagement: IVehicleInventoryManagement){
        this.vehicleInventoryManagement = vehicleInventoryManagement;
        this.reservations = []
        // this.location = location;
    }

    setVehicles(vehicles: IVehicle[]): IVehicle[] {
        return this.vehicleInventoryManagement.addVehicle(vehicles);
    }

    getAvailableVehicles(): IVehicle[] {
        // map through the vehicle
        return this.vehicleInventoryManagement.getAvailableVehicles();
    }

    // getLocation(): Location {
    //     return this.location;
    // }

    createResevation(user: IUser, vehicleId: number, startDate: Date, endDate: Date): IReservation|null{
        const vehicle = this.vehicleInventoryManagement.getVehicleById(vehicleId);

        if(vehicle && vehicle.getVehicleBookingStatus() == VehicleStatus.AVAILABLE){
            const reservation = new Reservation(1, user, vehicle, startDate, endDate);
            this.reservations.push(reservation);
            this.vehicleInventoryManagement.updateVehicleStatus(vehicle.getVehicleId(), VehicleStatus.BOOKED);
            user.addRentalHistory(reservation);
            return reservation;
        }
        return null;
    }

    cancelReservation(reservation: Reservation) {
        this.vehicleInventoryManagement.updateVehicleStatus(reservation.vehicle.getVehicleId(), VehicleStatus.AVAILABLE);
        reservation.status = 'Canceled';
        this.reservations = this.reservations.filter(cur => cur.getResevarionId() != reservation.getResevarionId());
    }

    completeResevation(reservation: Reservation): void {
        this.vehicleInventoryManagement.updateVehicleStatus(reservation.vehicle.getVehicleId(), VehicleStatus.AVAILABLE);
        reservation.status = 'Completed';
        this.reservations = this.reservations.filter(cur => cur.getResevarionId() != reservation.getResevarionId());
    }
}