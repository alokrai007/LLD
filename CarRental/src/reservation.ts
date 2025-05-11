import { IReservation, IUser, IVehicle } from "./types";

export class Reservation implements IReservation {
    reservationId: number;
    user: IUser;
    vehicle: IVehicle;
    startDate: Date;
    endDate: Date;
    status: string;

    
    constructor(reservationId: number, user: IUser, vehicle: IVehicle, startDate: Date, endDate: Date){
        this.reservationId = reservationId;
        this.user = user;
        this.vehicle = vehicle;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = "Booked";
    }

    getResevarionId(): number {
        return this.reservationId;
    }

    calculateTotalAmount(): number {
    return 100;
    }

}