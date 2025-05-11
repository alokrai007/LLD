import { IVehicle, IVehicleInventoryManagement, VehicleStatus, VehicleType } from "./types";

export class VehicleInventoryManagement implements IVehicleInventoryManagement {
    vechiles: IVehicle[];
    
    constructor(){
        this.vechiles = [];
    }

    addVehicle(vehicle: IVehicle[]): IVehicle[]{
        this.vechiles.push(...vehicle)
        return this.vechiles;
    }

    getVehicleById(vehicleId: number): IVehicle|undefined{
       return this.vechiles.find(vehicle => vehicle.getVehicleId() == vehicleId);
    }

    getAvailableVehicles() : IVehicle[]{
        return this.vechiles.filter(vehicle => (vehicle.getVehicleBookingStatus() == VehicleStatus.AVAILABLE));
    }

    updateVehicleStatus(vehicleId: number, vehicleStatus: VehicleStatus): void{
        let vehicle = this.getVehicleById(vehicleId);
        if(vehicle){
            vehicle.updateVehicleStatus(vehicleStatus);
        }
    }

}