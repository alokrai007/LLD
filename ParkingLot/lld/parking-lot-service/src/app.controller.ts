import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ParkingLot } from './parkingLot.service';
import { CreateTicketDto } from './dto/createTicket.dto';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('parking')
export class ParkingLotController {
  constructor(private readonly parkingService: ParkingLot) {}

  @Post('requestParkingSpace')
  async requestParkingSpace(@Body() createTicketDto: CreateTicketDto){
    return this.parkingService.requestParkingSpace(createTicketDto?.ticketId);
  }

  @Post('checkout')
  async checkout(@Body() checkoutDto: CheckoutDto){
    return this.parkingService.checkoutTicket(checkoutDto?.ticketId)
  }


  
}
