import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ParkingLotEntity } from "./parkingLot.entity";
import { ParkingLot } from "../parkingLot.service";

@Entity()
export class ParkingSpotEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    spotId: string

    @Column({name: 'vehicle_id', default: null})
    vehicleId: string;

    @Column({name: 'is_occupied', default: false})
    isOccupied: boolean

    @Column()
    @ManyToOne(() => ParkingLotEntity, (space) => space.parkingSpots)
    parkingLot: ParkingLotEntity
}