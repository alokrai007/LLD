import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ParkingSpotEntity } from "./parkingSpot.entity";

@Entity()
export class ParkingTicketEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    vehicleId: string;

    @ManyToOne(() => ParkingSpotEntity, space => space.id)
    @JoinColumn({ name: 'parking_spot_id' })
    parkingSpot: ParkingSpotEntity;

    @Column()
    entryTime: Date;

    @Column({ nullable: true })
    exitTime: Date;

}