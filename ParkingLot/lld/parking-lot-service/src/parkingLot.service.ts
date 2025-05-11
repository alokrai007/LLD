import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ParkingLotEntity } from "./entity/parkingLot.entity";
import { Repository } from "typeorm";
import { ParkingSpotEntity } from "./entity/parkingSpot.entity";
import { ParkingTicketEntity } from "./entity/parkingTicket.entity";
import { ParkingFeeEntity } from "./entity/parkingFee.entity";

@Injectable()
export class ParkingLot{
    constructor(
        @InjectRepository(ParkingLotEntity)
        private parkingLot: Repository<ParkingLotEntity>,
        @InjectRepository(ParkingSpotEntity)
        private parkingSpot: Repository<ParkingSpotEntity>,
        @InjectRepository(ParkingTicketEntity)
        private parkingTicket: Repository<ParkingTicketEntity>,
        @InjectRepository(ParkingFeeEntity)
        private parkingFee: Repository<ParkingFeeEntity>,
    ){
       this.initializeParkingLot();
    }

    private async initializeParkingLot(){
        const existingParkingLot = await this.parkingLot.findOne({where: {name : 'Main Parking Lot' }});
        if(existingParkingLot){
            console.log("parking lot exists");
            return ;
        }
        const parkingLot = new ParkingLotEntity();
        parkingLot.name = 'Main Parking Lot';

        const savedParkingLot = await this.parkingLot.save(parkingLot);

        await this.initializeParkingSpaces(savedParkingLot);
    }

    private async initializeParkingSpaces(parkingLot: ParkingLotEntity){
        for( let i = 0; i< 100; i++){
            const parkingSpace = new ParkingSpotEntity();
            parkingSpace.spotId = `spot_${i+1}`;
            parkingSpace.isOccupied = false;
            parkingSpace.parkingLot = parkingLot;
            await this.parkingSpot.save(parkingSpace);
        }
        console.log('Parking spaces initialized successfully!');
    }
    async requestParkingSpace(vehicleId: string){
        // check if any parking space is available.
        const availableSpot = await this.parkingSpot.findOne({
            where: {isOccupied: false}
        });
        if (!availableSpot) {
            throw new Error('Parking not available');
        }

        availableSpot.isOccupied = true;
        availableSpot.vehicleId = vehicleId;
        await this.parkingSpot.save(availableSpot);

        // create a ticket
        const parkingTicket = new ParkingTicketEntity();
        parkingTicket.parkingSpot = availableSpot;
        parkingTicket.vehicleId = vehicleId;
        parkingTicket.entryTime = new Date();

        await this.parkingTicket.save(parkingTicket);
        return parkingTicket;
    }

    async checkoutTicket(parkingTicket: Partial<ParkingTicketEntity>){
        const ticket = await this.parkingTicket.findOne({
            where: {id: parkingTicket.id}
        })
        if(!ticket){
            throw new Error('Ticket not found');
        }
        const parkingFee = this.calculateParkingFee(ticket.entryTime);
        const fee = new ParkingFeeEntity();
        fee.amount = parkingFee;
        fee.parkingTicket = parkingTicket;
        fee.paymentTime = new Date();
        await this.parkingFee.save(fee);
        ticket.parkingSpot.isOccupied = false;
        await this.parkingSpot.save(ticket.parkingSpot);
        return fee;
    }

    private calculateParkingFee(issueTime: Date): number {
        const duration = (new Date().getTime() - new Date(issueTime).getTime()) / 1000; // Duration in seconds
        return Math.max(duration / 3600 * 10, 5); // Charge 10 per hour, min charge 5
      }
}