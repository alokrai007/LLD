import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ParkingTicketEntity } from "./parkingTicket.entity";

@Entity()
export class ParkingFeeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    paymentTime: Date;

    @Column()
    @ManyToOne(() => ParkingTicketEntity, ticket => ticket.id)
    parkingTicket: ParkingTicketEntity
}