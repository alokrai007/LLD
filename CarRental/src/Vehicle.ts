import { IVehicle, VehicleStatus, VehicleType } from "./types";

export class Vehicle implements IVehicle {
    vehicleId: number;
    licenseNumber: string;
    status: VehicleStatus;
    price: number;
    vehicleType: VehicleType;

    constructor(vehicleId: number, licenseNumber: string, price: number, vehicleType: VehicleType){
        this.vehicleId = vehicleId;
        this.licenseNumber = licenseNumber;
        this.status = VehicleStatus.AVAILABLE;
        this.price = price;
        this.vehicleType = vehicleType;
    }

    getVehicleId(): number {
        return this.vehicleId;
    }

    getVehicleType(): VehicleType{
        return this.vehicleType;
    }

    getVehicleBookingStatus(): VehicleStatus{
        return this.status;
    }

    getLicenseNumber(): string {
        return this.licenseNumber;
    }

    getPrice(): number {
        return this.price;
    }
    
    updateVehicleStatus(status: VehicleStatus): VehicleStatus {
       return this.status = status;
    }

}