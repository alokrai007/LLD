/**
 * Enum representing different types of vehicles available for rent
 */
export enum VehicleType {
    CAR = 'CAR',
    BIKE = 'BIKE',
    TRUCK = 'TRUCK',
    VAN = 'VAN'
}

/**
 * Enum representing the status of a vehicle
 */
export enum VehicleStatus {
    AVAILABLE = 'AVAILABLE',
    RENTED = 'RENTED',
    MAINTENANCE = 'MAINTENANCE'
}

/**
 * Enum representing the status of a reservation
 */
export enum ReservationStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}

/**
 * Interface for vehicle information
 */
export interface IVehicle {
    id: number;
    licenseNumber: string;
    dailyRate: number;
    type: VehicleType;
    status: VehicleStatus;
    getVehicleType(): VehicleType;
    getLicenseNumber(): string;
    getDailyRate(): number;
    getStatus(): VehicleStatus;
    setStatus(status: VehicleStatus): void;
}

/**
 * Interface for user information
 */
export interface IUser {
    id: number;
    name: string;
    email: string;
    phone: number;
    location: string;
    getName(): string;
    getEmail(): string;
    getPhone(): number;
    getLocation(): string;
}

/**
 * Interface for reservation information
 */
export interface IReservation {
    id: number;
    user: IUser;
    vehicle: IVehicle;
    startDate: Date;
    endDate: Date;
    status: ReservationStatus;
    totalCost: number;
    getReservationId(): number;
    getStatus(): ReservationStatus;
    setStatus(status: ReservationStatus): void;
    calculateTotalCost(): number;
}

/**
 * Interface for inventory management
 */
export interface IInventoryManagement {
    addVehicle(vehicles: IVehicle[]): void;
    removeVehicle(vehicleId: number): boolean;
    getVehicle(vehicleId: number): IVehicle | null;
    getAvailableVehicles(): IVehicle[];
    updateVehicleStatus(vehicleId: number, status: VehicleStatus): boolean;
}

/**
 * Interface for store operations
 */
export interface IStore {
    createReservation(user: IUser, vehicleId: number, startDate: Date, endDate: Date): IReservation | null;
    cancelReservation(reservationId: number): boolean;
    getAvailableVehicles(): IVehicle[];
    getReservation(reservationId: number): IReservation | null;
    getUserReservations(userId: number): IReservation[];
} 