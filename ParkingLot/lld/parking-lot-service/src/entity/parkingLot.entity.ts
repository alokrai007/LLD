import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ParkingSpotEntity } from "./parkingSpot.entity";

@Entity()
export class ParkingLotEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({unique: true})
    name: string;

    @OneToMany(() => ParkingSpotEntity, (space) => space.parkingLot)
  @JoinColumn({ name: 'parking_spot_id' })
    parkingSpots: ParkingSpotEntity[];

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
    
}