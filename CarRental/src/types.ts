import { Reservation } from "./reservation";

export enum VehicleType{
    CAR = "car",
    BIKE = "bike"
}

export enum VehicleStatus {
    AVAILABLE = "available",
    BOOKED = "booked",
    MAINTENANCE = "maintenance",
}

/* 
    vehicleId
    vehicleType
    bookingstatus -> booked/Available
    licenseNumber
    pricePerHour
*/
export interface IVehicle {
    getVehicleId(): number;
    getVehicleType(): VehicleType;
    getVehicleBookingStatus(): VehicleStatus;
    getLicenseNumber(): string;
    getPrice(): number;
    updateVehicleStatus(vehicleStatus: VehicleStatus): void;
}

/*
    VehicleInventoryManagement
*/
export interface IVehicleInventoryManagement {
    addVehicle(vehicles: IVehicle[]): IVehicle[];
    getAvailableVehicles(): IVehicle[];
    getVehicleById(vehicleId: number): IVehicle|undefined;
    updateVehicleStatus(vehicleId: number, vehicleStatus: VehicleStatus): void
}

/* 
    A store will have list of vehicles, list of reservations, location

*/
export interface IStore {
    getAvailableVehicles(): IVehicle[];
    // getLocation(): Location;
    // getReservations(): IReservation[]; 
    setVehicles(vehicles: IVehicle[]): IVehicle[];
    createResevation(user: IUser, vehicle: number, startDate: Date, endDate: Date): IReservation|null;
    completeResevation(reservation: Reservation): void;
}

/*
    A reservation will have a user, vehicle, reservationStatus
*/
export interface IReservation {
    // createReservation(user: IUser, vehicle: IVehicle): number;
    getResevarionId(): number;
    calculateTotalAmount(): number
}


export interface IUser {
    // getUserId(): number;
    // getUserName(): string;
    // requestVehicleBooking(store: IStore, startDate: Date, endDate: Date)
    getRentalHistory(): Reservation[];
    addRentalHistory(reservation: Reservation): void;
}

export interface ILocation {
    getAddress() : string;
    getPincode() : number;
}

