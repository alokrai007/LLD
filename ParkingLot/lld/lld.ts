// i want to design a parking lot system, 
// 1. there are multiple floors in the parking lot
// 2. each floor has a certain number of parking spots
// 3. each parking spot has a certain size
// 4. the parking spots are of different types, such as compact, large, motorcycle, etc.
// 5. the parking spots are of different prices, depending on the size and type
// i will think of the classes and their relationShip, start with most important classes
// we will have enum for vehicle type
enum VehicleType{
    CAR = "CAR",
    TRUCK = "TRUCK",
    MOTORCYCLE = "MOTORCYCLE"
}

class Vehicle {
    private licensePlate: string;
    private vehicleType: string;
    constructor(
        licensePlate: string,
        vehicleType: string,
    ) {
        this.licensePlate = licensePlate;
        this.vehicleType = vehicleType;
    }
    public getVehicleType(): string {
        return this.vehicleType;
    }
    public getLicensePlate(): string {
        return this.licensePlate;
    }
    public setLicensePlate(licensePlate: string): void {
        this.licensePlate = licensePlate;
    }
    public setVehicleType(vehicleType: string): void {
        this.vehicleType = vehicleType;
    }
}

// next we will have a class for parking spot, what properties does it have
class ParkingSpot {
    private spotId: string,
        private spotType: string,
        private isOccupied: boolean,
        private vehicle: Vehicle | null
    constructor(
        spotId: string,
        spotType: string,
    ){
        this.spotId = spotId;
        this.spotType = spotType;
        this.isOccupied = false;
        this.vehicle = null;
    }

    public canPark(vehicle: Vehicle): boolean {
        if (this.isOccupied) {
            return false;
        }
        if (this.spotType === vehicle.getVehicleType()) {
            return true;
        }
        return false;
    }
    public park(vehicle: Vehicle): boolean {
        if(this.canPark(vehicle)) {
            this.isOccupied = true;
            this.vehicle = vehicle;
            return true;
        }
        return false;
    }
    public unpark(vehicle: Vehicle) {
        this.isOccupied = false;
        this.vehicle = null;
    }
}

// next we will have a class for floor, what properties does it have
class Floor {
    private floorId: string
    private parkingSpots: ParkingSpot[]
    constructor(
        floorId: string,
    ){
        this.floorId = floorId;
        this.parkingSpots = [];
    }

    public getParkingSpots(): ParkingSpot[] {
        return this.parkingSpots;
    }
    public getFloorId(): string {
        return this.floorId;
    }
    public addParkingSpot(parkingSpot: ParkingSpot): void {
        this.parkingSpots.push(parkingSpot)
    }
    public findAvailableSpot(vehicle: Vehicle): ParkingSpot | null {
        for (const spot of this.parkingSpots) {
            if (spot.canPark(vehicle)) {
                return spot;
            }
        }
        return null;
    }

    public findTotalAvailableSpots(): number {
        return this.parkingSpots.filter((spot) => !spot.canPark).length;
    }
    public findAvailableSpots(vehicle: Vehicle): ParkingSpot[] {
        const availableSpots: ParkingSpot[] = [];
        for (const spot of this.parkingSpots) {
            if (spot.canPark(vehicle)) {
                availableSpots.push(spot);
            }
        }
        return availableSpots;
    }
}

// next we will have a class for parking lot, what properties does it have
class ParkingLot {
    private name: string
    private floors: Floor[]
    private activeTickets = new Map<string, ParkingTicket>();
    constructor(
        name: string,
        totalFloor: []
    ){
        this.name = name;
        this.floors = [];
        // initialize the floors & parking spots for each floor
        for (const currentFloor of totalFloor) {
            // create a floor
            const floor = new Floor(`Floor-${currentFloor}`)
            // we will generate parking spots for floor
            const spotType = [{type: VehicleType.CAR, count: 10}, {type: VehicleType.TRUCK, count: 5}, {type: VehicleType.MOTORCYCLE, count: 15}];
            spotType.forEach((type) => {
                for (let i = 0; i<type.count; i++) {
                   const spot = new ParkingSpot(`Spot-${i+1}`, type.type);
                   floor.addParkingSpot(spot);
                }

            })
            this.floors.push(floor);
        }
    }

    public getFloors(): Floor[] {
        return this.floors;
    }
    
    public addFloor(floor: Floor): void {
        this.floors.push(floor);
    }

    public parkVehicle(vehicle: Vehicle){
        // we will check for available spots on each floor
        for (const floor of this.floors) {
            const availableSpot = floor.findAvailableSpot(vehicle);
            if(availableSpot) {
                if(availableSpot.park(vehicle)) {
                    const ticket = new ParkingTicket(vehicle, availableSpot, new Date());
                    this.activeTickets.set(vehicle.getLicensePlate(), ticket);
                    return ticket;
                }
            }
        }
        throw new Error('No available parking spot');
    }

    public unparkVehicle(vehicle: Vehicle){
        const ticket = this.activeTickets.get(vehicle.getLicensePlate());
        if (!ticket) {
            throw new Error('No active ticket found');
        }
        ticket.setExitTime(new Date());
        const parkingFee = ticket.calculateParkingCost(ticket.getExitTime() as Date);
        ticket.getParkingSpot().unpark(vehicle);
        this.activeTickets.delete(vehicle.getLicensePlate());
        return {
            parkingFee,
            ticket
        }
    }

    public getParkingStatus()
}

// next we will have a class for parking ticket, what properties does it have
class ParkingTicket {
    private ticketId: string
    private vehicle: Vehicle
    private parkingSpot: ParkingSpot
    private entryTime: Date
    private exitTime: Date|null
    private totalCost: number
    constructor(
        vehicle: Vehicle,
        parkingSpot: ParkingSpot,
        entryTime: Date,
    ){
        this.vehicle = vehicle
        this.parkingSpot = parkingSpot
        this.entryTime = entryTime
        this.exitTime = null
    }

    public calculateParkingCost(exitTime: Date): number {
        const totalHours = exitTime.getTime() - this.entryTime.getTime();
        const ratePerHour = {
            [VehicleType.CAR]: 10,
            [VehicleType.MOTORCYCLE]: 5,
            [VehicleType.TRUCK]: 20
        };
        const totalCost = totalHours * ratePerHour[this.vehicle.getVehicleType()];
        return totalCost;
    }

    public getExitTime(): Date|null {
        return this.exitTime;
    }

    public getParkingSpot(): ParkingSpot {
        return this.parkingSpot;
    }



    public setExitTime(exitTime: Date): void {
        this.exitTime = exitTime;
    }



}