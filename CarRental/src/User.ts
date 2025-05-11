import { Reservation } from "./reservation";
import { IUser } from "./types";

export class User implements IUser {
    private userId: number;
    private name: string;
    private email: string;
    private phone: number;
    private address: string;
    private rentalHistory: Reservation[];

    constructor(customerId: number, name: string, email: string, phone: number, address: string){
        this.userId = customerId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.rentalHistory = [];
    }

    getRentalHistory(): Reservation[]{
        return this.rentalHistory;
    }

    addRentalHistory(reservation: Reservation): void {
        this.rentalHistory.push(reservation);
    }

}